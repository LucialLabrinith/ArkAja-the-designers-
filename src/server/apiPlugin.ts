import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export function studioApiPlugin(): Plugin {
  return {
    name: 'arkaja-studio-api-plugin',
    configureServer(server) {
      // Ensure data and public directories exist reliably from project root
      const publicImagesDir = path.resolve(process.cwd(), 'public/images');
      const dataDir = path.resolve(process.cwd(), 'data');
      if (!fs.existsSync(publicImagesDir)) {
        fs.mkdirSync(publicImagesDir, { recursive: true });
      }
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const enquiriesFilePath = path.join(dataDir, 'enquiries.json');
      if (!fs.existsSync(enquiriesFilePath)) {
        fs.writeFileSync(enquiriesFilePath, '[]', 'utf-8');
      }

      const manifestFilePath = path.join(publicImagesDir, 'custom-manifest.json');
      if (!fs.existsSync(manifestFilePath)) {
        fs.writeFileSync(manifestFilePath, '{}', 'utf-8');
      }

      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        // 1. Password verification endpoint
        if (url === '/api/admin/verify' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (data.password === 'jamessu') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, authorized: true }));
              } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid password' }));
              }
            } catch {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
          });
          return;
        }

        // 2. Single Poster Upload Endpoint (Password Protected with 'jamessu')
        if (url === '/api/upload' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              if (payload.password !== 'jamessu') {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Unauthorized: Incorrect password' }));
                return;
              }

              const { slotId, dataUrl } = payload;
              if (!slotId || !dataUrl) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Missing slotId or dataUrl' }));
                return;
              }

              // Extract base64 data
              const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
              if (!matches || matches.length !== 3) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid base64 data URL' }));
                return;
              }

              const buffer = Buffer.from(matches[2], 'base64');
              const targetPath = path.join(publicImagesDir, `${slotId}.png`);
              fs.writeFileSync(targetPath, buffer);

              // Update manifest
              try {
                let manifest: Record<string, string> = {};
                if (fs.existsSync(manifestFilePath)) {
                  manifest = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'));
                }
                manifest[slotId] = `/images/${slotId}.png`;
                fs.writeFileSync(manifestFilePath, JSON.stringify(manifest, null, 2), 'utf-8');
              } catch {}

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                url: `/images/${slotId}.png`,
                slotId
              }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // 2b. Batch Sync All Uploaded Images to public/images/
        if (url === '/api/sync-uploaded-images' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              if (payload.password !== 'jamessu') {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Unauthorized' }));
                return;
              }

              const { images } = payload;
              if (!images || typeof images !== 'object') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Missing images object' }));
                return;
              }

              let manifest: Record<string, string> = {};
              try {
                if (fs.existsSync(manifestFilePath)) {
                  manifest = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'));
                }
              } catch {}

              let savedCount = 0;
              for (const [slotId, dataUrl] of Object.entries(images as Record<string, string>)) {
                if (!dataUrl) continue;
                const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                if (matches && matches[2]) {
                  const buffer = Buffer.from(matches[2], 'base64');
                  const targetPath = path.join(publicImagesDir, `${slotId}.png`);
                  fs.writeFileSync(targetPath, buffer);
                  manifest[slotId] = `/images/${slotId}.png`;
                  savedCount++;
                }
              }

              fs.writeFileSync(manifestFilePath, JSON.stringify(manifest, null, 2), 'utf-8');

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                savedCount,
                manifest
              }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // 2c. Available Images List Endpoint
        if (url === '/api/images/list' && req.method === 'GET') {
          try {
            const files = fs.existsSync(publicImagesDir) ? fs.readdirSync(publicImagesDir) : [];
            let manifest = {};
            if (fs.existsSync(manifestFilePath)) {
              manifest = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ files, manifest }));
          } catch {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ files: [], manifest: {} }));
          }
          return;
        }

        // 3. Client Enquiry Submission (No payment required)
        if (url === '/api/enquiries' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const enquiry = JSON.parse(body);
              enquiry.id = 'enq_' + Date.now().toString(36);
              enquiry.createdAt = new Date().toISOString();

              let existing = [];
              try {
                const content = fs.readFileSync(enquiriesFilePath, 'utf-8');
                existing = JSON.parse(content);
              } catch {
                existing = [];
              }

              existing.unshift(enquiry);
              fs.writeFileSync(enquiriesFilePath, JSON.stringify(existing, null, 2), 'utf-8');

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                enquiryId: enquiry.id,
                message: 'Enquiry submitted successfully to ArkAja Studio'
              }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // 4. Fetch Client Enquiries (Protected with password 'jamessu')
        if (url === '/api/enquiries' && req.method === 'GET') {
          const authHeader = req.headers['x-admin-password'];
          if (authHeader !== 'jamessu') {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized: Password required' }));
            return;
          }

          try {
            const content = fs.readFileSync(enquiriesFilePath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(content);
          } catch {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('[]');
          }
          return;
        }

        // 5. AI-Generated Help Centre Assistant Endpoint (Powered by Gemini 3.8 Flash)
        if (url === '/api/help/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', async () => {
            try {
              const { message } = JSON.parse(body);
              if (!message || typeof message !== 'string') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid message' }));
                return;
              }

              let aiReply = '';
              try {
                const { GoogleGenAI } = await import('@google/genai');
                const ai = new GoogleGenAI();
                const systemPrompt = `You are the official ArkAja Studio Help Centre AI assistant.
ArkAja Studio creates luxury editorial visual designs, social post campaigns, story frames, promotional creatives, and short-form visual assets for beauty, fashion, apparel, and boutique hospitality brands.
Studio Gmail: arkajastudio@gmail.com
Deliverable Offerings & Production Highlights:
• High-impact social posts (curated art direction & color grading)
• Editorial story frames (9:16 vertical storytelling)
• Promotional creatives with offer (high-converting campaign posters)
• Short-form visual assets / reel covers (editorial hook visuals)
Production Highlights:
• Curated art direction & color grading
• Exported in high-resolution ready for publish
• Standard 3–4 business days delivery (with 48h priority options)
• 1 round of revision included
Customization:
Clients can customize the exact quantity of each deliverable and specify personal details or brand requirements.
Submitting an enquiry does not require an upfront payment; the studio director personally reviews every brief and follows up via email (arkajastudio@gmail.com).
Provide warm, concise, professional answers (2 to 4 sentences). Keep tone elevated, helpful, and direct.`;

                const response = await ai.models.generateContent({
                  model: 'gemini-3.8-flash',
                  contents: `${systemPrompt}\n\nClient Question: ${message}\nAnswer:`
                });
                aiReply = response.text || '';
              } catch (geminiErr: any) {
                console.warn('Gemini API call failed, using intelligent fallback:', geminiErr?.message);
              }

              // Fallback answers if Gemini is unavailable
              if (!aiReply) {
                const lower = message.toLowerCase();
                if (lower.includes('custom') || lower.includes('number') || lower.includes('quantity')) {
                  aiReply = "Yes! You can completely customize the exact number of high-impact social posts, editorial story frames, promotional creatives, and short-form visual assets on our Enquiry Page. You can also specify any bespoke requirements.";
                } else if (lower.includes('delivery') || lower.includes('turnaround') || lower.includes('time') || lower.includes('days')) {
                  aiReply = "Our standard production turnaround is 3–4 business days with curated art direction, color grading, and high-resolution exports. Expedited 48-hour delivery is also available upon request.";
                } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('parcel')) {
                  aiReply = "Our packages range from Starter ($49 / £39 / ₹2,499) to Signature ($99 / £79 / ₹4,999), and our Custom Parcel lets you pick deliverables modularly with itemized rates. Submitting an enquiry is completely free with no payment required.";
                } else if (lower.includes('email') || lower.includes('contact') || lower.includes('gmail') || lower.includes('reach')) {
                  aiReply = "You can reach us directly at arkajastudio@gmail.com. Clicking our email on the Enquiry page will open your email client with your project details pre-filled.";
                } else {
                  aiReply = "ArkAja Studio provides bespoke editorial campaigns, social posts, story frames, and launch creatives. Feel free to customize your parcel deliverables on our Enquiry page or email us directly at arkajastudio@gmail.com.";
                }
              }

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, reply: aiReply }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}
