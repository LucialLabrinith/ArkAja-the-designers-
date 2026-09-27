import React, { createContext, useContext, useState, useEffect } from 'react';

interface ImageStorageContextType {
  customImages: Record<string, string>;
  setImageForSlot: (slotId: string, fileOrDataUrl: File | string, adminPassword?: string) => Promise<void>;
  setMultipleImages: (slots: Record<string, File | string>, adminPassword?: string) => Promise<void>;
  removeImageForSlot: (slotId: string) => Promise<void>;
  clearAllCustomImages: () => Promise<void>;
  getImageForSlot: (slotId: string) => string | undefined;
  syncToServer: (adminPassword?: string) => Promise<{ success: boolean; count?: number; error?: string }>;
  exportBackup: () => void;
  importBackup: (jsonContent: string) => Promise<boolean>;
  isReady: boolean;
}

const ImageStorageContext = createContext<ImageStorageContextType | undefined>(undefined);

const DB_NAME = 'ArkAjaStudioMediaDB';
const STORE_NAME = 'campaign_images';
export const DB_VERSION = 1;

export function normalizeAssetPath(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }
  if (trimmed.startsWith('./')) {
    return '/' + trimmed.slice(2);
  }
  if (!trimmed.startsWith('/')) {
    return '/' + trimmed;
  }
  return trimmed;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export const ImageStorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronously initialize from localStorage so images appear on the very first frame!
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('arkaja_custom_images');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') return parsed;
        }
      }
    } catch {}
    return {};
  });

  const [isReady, setIsReady] = useState(false);

  // Load saved images from:
  // 1. Static custom-manifest.json (works on static deployments like Vercel)
  // 2. localStorage
  // 3. IndexedDB
  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      const merged: Record<string, string> = {};

      // 1. Check if a static manifest exists in public/images/custom-manifest.json
      try {
        const res = await fetch('/images/custom-manifest.json');
        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (!contentType.includes('text/html')) {
            const manifest = await res.json();
            if (manifest && typeof manifest === 'object') {
              for (const [key, val] of Object.entries(manifest)) {
                if (typeof val === 'string' && val.trim()) {
                  merged[key] = normalizeAssetPath(val);
                }
              }
            }
          }
        }
      } catch {}

      // 2. Check localStorage
      try {
        const local = localStorage.getItem('arkaja_custom_images');
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed && typeof parsed === 'object') {
            for (const [key, val] of Object.entries(parsed)) {
              if (typeof val === 'string' && val.trim()) {
                merged[key] = normalizeAssetPath(val);
              }
            }
          }
        }
      } catch {}

      // 3. Check IndexedDB
      try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.openCursor();

        await new Promise<void>((resolve) => {
          req.onsuccess = (e) => {
            const cursor = (e.target as IDBRequest).result as IDBCursorWithValue;
            if (cursor) {
              if (cursor.value) {
                merged[cursor.key as string] = cursor.value;
              }
              cursor.continue();
            } else {
              resolve();
            }
          };
          req.onerror = () => resolve();
        });
      } catch (err) {
        console.warn('IndexedDB cursor read completed or skipped:', err);
      }

      if (isMounted) {
        setCustomImages((prev) => {
          const combined = { ...prev, ...merged };
          // Keep localStorage up to date
          try {
            localStorage.setItem('arkaja_custom_images', JSON.stringify(combined));
          } catch {}
          return combined;
        });
        setIsReady(true);
      }
    }

    loadAll();
    return () => {
      isMounted = false;
    };
  }, []);

  const persistToStorages = async (nextImages: Record<string, string>, slotId?: string, dataUrl?: string) => {
    // 1. LocalStorage
    try {
      localStorage.setItem('arkaja_custom_images', JSON.stringify(nextImages));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    // 2. IndexedDB
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      if (slotId && dataUrl) {
        store.put(dataUrl, slotId);
      } else {
        for (const [key, val] of Object.entries(nextImages)) {
          store.put(val, key);
        }
      }
      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn('IndexedDB save failed:', err);
    }
  };

  const setImageForSlot = async (slotId: string, fileOrDataUrl: File | string, adminPassword = 'jamessu') => {
    const dataUrl =
      typeof fileOrDataUrl === 'string'
        ? fileOrDataUrl
        : await fileToDataUrl(fileOrDataUrl);

    const next = { ...customImages, [slotId]: dataUrl };
    setCustomImages(next);
    await persistToStorages(next, slotId, dataUrl);

    // Also persist directly to server disk if dev server is running
    try {
      await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: adminPassword,
          slotId,
          dataUrl
        })
      });
    } catch {}
  };

  const setMultipleImages = async (slots: Record<string, File | string>, adminPassword = 'jamessu') => {
    const processed: Record<string, string> = {};
    for (const [key, val] of Object.entries(slots)) {
      processed[key] = typeof val === 'string' ? val : await fileToDataUrl(val);
    }

    const next = { ...customImages, ...processed };
    setCustomImages(next);
    await persistToStorages(next);

    // Sync to server disk
    try {
      await fetch('/api/sync-uploaded-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: adminPassword,
          images: processed
        })
      });
    } catch {}
  };

  const removeImageForSlot = async (slotId: string) => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(slotId);
    } catch {}

    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[slotId];
      try {
        localStorage.setItem('arkaja_custom_images', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearAllCustomImages = async () => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
    } catch {}
    try {
      localStorage.removeItem('arkaja_custom_images');
    } catch {}
    setCustomImages({});
  };

  // Sync all currently loaded images from browser directly to server's public/images/
  const syncToServer = async (adminPassword = 'jamessu') => {
    if (Object.keys(customImages).length === 0) {
      return { success: false, error: 'No custom uploaded images found in browser storage.' };
    }

    try {
      const res = await fetch('/api/sync-uploaded-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: adminPassword,
          images: customImages
        })
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, count: data.savedCount || Object.keys(customImages).length };
      } else {
        return { success: false, error: 'Server responded with error status: ' + res.status };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Could not connect to server' };
    }
  };

  // Export full backup as downloadable JSON file
  const exportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(customImages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `arkaja-artwork-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup into browser storage
  const importBackup = async (jsonContent: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonContent);
      if (parsed && typeof parsed === 'object') {
        const next = { ...customImages, ...parsed };
        setCustomImages(next);
        await persistToStorages(next);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const getImageForSlot = (slotId: string): string | undefined => {
    let resolved = customImages[slotId];

    // Alias mapping for flexibility across IDs, slugs, and filenames
    if (!resolved) {
      if (slotId === 'lumiere-1') resolved = customImages['lumiere'];
      else if (slotId === 'lumiere') resolved = customImages['lumiere-1'];
      else if (slotId === 'elan-1') resolved = customImages['elan'] || customImages['autumn'] || customImages['the-autumn-edit'] || customImages['autumn-edit'];
      else if (slotId === 'elan') resolved = customImages['elan-1'] || customImages['autumn'] || customImages['the-autumn-edit'] || customImages['autumn-edit'];
      else if (slotId === 'noir-1') resolved = customImages['noir'] || customImages['noir-and-bean'];
      else if (slotId === 'noir' || slotId === 'noir-and-bean') resolved = customImages['noir-1'] || customImages['noir'];
      else if (slotId === 'saree-1') resolved = customImages['saree'] || customImages['saree-edit'] || customImages['saree_left'];
      else if (slotId === 'saree-2') resolved = customImages['saree_right'];
      else if (slotId === 'saree' || slotId === 'saree-edit') resolved = customImages['saree-1'] || customImages['saree'];
      else if (slotId === 'muse-1') resolved = customImages['muse'] || customImages['muse-beauty-london'];
      else if (slotId === 'muse' || slotId === 'muse-beauty-london') resolved = customImages['muse-1'] || customImages['muse'];
    }

    if (!resolved) return undefined;
    return normalizeAssetPath(resolved);
  };

  return (
    <ImageStorageContext.Provider
      value={{
        customImages,
        setImageForSlot,
        setMultipleImages,
        removeImageForSlot,
        clearAllCustomImages,
        getImageForSlot,
        syncToServer,
        exportBackup,
        importBackup,
        isReady
      }}
    >
      {children}
    </ImageStorageContext.Provider>
  );
};

export const useImageStorage = () => {
  const context = useContext(ImageStorageContext);
  if (!context) {
    throw new Error('useImageStorage must be used within an ImageStorageProvider');
  }
  return context;
};
