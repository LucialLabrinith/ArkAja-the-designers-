import React, { createContext, useContext, useState, useEffect } from 'react';

interface ImageStorageContextType {
  customImages: Record<string, string>;
  setImageForSlot: (slotId: string, fileOrDataUrl: File | string, adminPassword?: string) => Promise<void>;
  setMultipleImages: (slots: Record<string, File | string>, adminPassword?: string) => Promise<void>;
  removeImageForSlot: (slotId: string) => Promise<void>;
  clearAllCustomImages: () => Promise<void>;
  getImageForSlot: (slotId: string) => string | undefined;
  isReady: boolean;
}

const ImageStorageContext = createContext<ImageStorageContextType | undefined>(undefined);

const DB_NAME = 'ArkAjaStudioMediaDB';
const STORE_NAME = 'campaign_images';
const DB_VERSION = 1;

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
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [isReady, setIsReady] = useState(false);

  // Load saved images from IndexedDB on startup
  useEffect(() => {
    let isMounted = true;
    async function loadAll() {
      try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.openCursor();
        const loaded: Record<string, string> = {};

        req.onsuccess = (e) => {
          const cursor = (e.target as IDBRequest).result as IDBCursorWithValue;
          if (cursor) {
            loaded[cursor.key as string] = cursor.value;
            cursor.continue();
          } else {
            if (isMounted) {
              setCustomImages(loaded);
              setIsReady(true);
            }
          }
        };
        req.onerror = () => {
          if (isMounted) setIsReady(true);
        };
      } catch (err) {
        console.warn('Could not load from IndexedDB, falling back to localStorage:', err);
        try {
          const fallback = localStorage.getItem('arkaja_custom_images');
          if (fallback && isMounted) {
            setCustomImages(JSON.parse(fallback));
          }
        } catch {
          // ignore
        }
        if (isMounted) setIsReady(true);
      }
    }

    loadAll();
    return () => {
      isMounted = false;
    };
  }, []);

  const setImageForSlot = async (slotId: string, fileOrDataUrl: File | string, adminPassword = 'jamessu') => {
    const dataUrl =
      typeof fileOrDataUrl === 'string'
        ? fileOrDataUrl
        : await fileToDataUrl(fileOrDataUrl);

    // Save to IndexedDB
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(dataUrl, slotId);
      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn('IndexedDB write failed, using localStorage:', err);
      try {
        const next = { ...customImages, [slotId]: dataUrl };
        localStorage.setItem('arkaja_custom_images', JSON.stringify(next));
      } catch {
        // storage quota
      }
    }

    // Also persist directly to server disk via /api/upload
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
    } catch (err) {
      console.warn('Server upload failed, cached in browser:', err);
    }

    setCustomImages((prev) => ({
      ...prev,
      [slotId]: dataUrl
    }));
  };

  const setMultipleImages = async (slots: Record<string, File | string>, adminPassword = 'jamessu') => {
    const processed: Record<string, string> = {};
    for (const [key, val] of Object.entries(slots)) {
      processed[key] = typeof val === 'string' ? val : await fileToDataUrl(val);
    }

    // Save batch to IndexedDB
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      for (const [key, val] of Object.entries(processed)) {
        store.put(val, key);
      }
      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn('Batch write failed:', err);
    }

    // Persist batch to server
    for (const [slotId, dataUrl] of Object.entries(processed)) {
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
      } catch (err) {
        // continue
      }
    }

    setCustomImages((prev) => ({
      ...prev,
      ...processed
    }));
  };

  const removeImageForSlot = async (slotId: string) => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(slotId);
    } catch {
      // ignore
    }
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const clearAllCustomImages = async () => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
    } catch {
      // ignore
    }
    try {
      localStorage.removeItem('arkaja_custom_images');
    } catch {
      // ignore
    }
    setCustomImages({});
  };

  const getImageForSlot = (slotId: string): string | undefined => {
    return customImages[slotId];
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
