import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('PUT to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.put({ id: 1, value: content });
    console.log('🚀 - data saved to the database', content);
  } catch (error) {
    console.error('putDb not implemented', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  try {
    const jateDb = await openDB('jate', 1);
    const result = await jateDb.get('jate', 1);
    if (result) {
      console.log('🚀 - data retrieved from the database', result.value);
      return result.value;
    } else {
      console.log('🚀 - data not found in the database');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while fetching data from the database:', error);
    return null;
  }
};


initdb();
