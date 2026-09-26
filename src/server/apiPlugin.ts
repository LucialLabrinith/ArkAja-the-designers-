import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export function studioApiPlugin(): Plugin {
  return {
    name: 'arkaja-studio-api-plugin',
    configureServer(server) {
      // Ensure data and public directories exist
      const publicImagesDir = path.resolve(__dirname, '../../public/images');
      const dataDir = path.resolve(__dirname, '../../data');
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

        // 2. Poster Upload Endpoint (Password Protected with 'jamessu')
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

        next();
      });
    }
  };
}
