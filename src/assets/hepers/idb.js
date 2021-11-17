import { openDB } from 'idb';

export async function getDb() {
  const dbPromise = await openDB('awesome-news', 1, {
    upgrade(db) {
      const articleStore = db.createObjectStore('articles', {
        keyPath: 'content.title',
        autoIncrement: true
      });

      articleStore.createIndex('title', 'content.title');
    },
  });

  return dbPromise;
}

export function getArticles(db) {
  return db.getAllFromIndex('articles', 'title');
}

export function setArticles(db, articles = []) {
  if (!db) return [];

  const tx = db.transaction('articles', 'readwrite');
  articles.forEach(article => tx.store.put(article));

  return getArticles(db);
}

