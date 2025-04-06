const DB_NAME = 'webfs';
const DB_VERSION = 1;
export const STORE_NAME = 'nodes';



let dbInstance: IDBDatabase | null = null;

export async function openDB (): Promise<IDBDatabase> {
	if (dbInstance) return dbInstance;

	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = () => {
			const db = request.result;

			if (!db.objectStoreNames.contains(STORE_NAME)) {
				const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });

				store.createIndex('parentId', 'parentId', { unique: false });
				store.createIndex('type', 'type', { unique: false });
				store.createIndex('createdAt', 'createdAt', { unique: false });
				store.createIndex('updatedAt', 'updatedAt', { unique: false });
				store.createIndex('openedAt', 'openedAt', { unique: false });
				store.createIndex('isFavorite', 'isFavorite', { unique: false });
			}
		};

		request.onsuccess = () => {
			dbInstance = request.result;

			// Handle if the DB is closed by the browser or manually
			dbInstance.onclose = () => {
				dbInstance = null;
			};

			resolve(dbInstance);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
}

export async function clearDB (): Promise<void> {
	const db = await openDB();

	return new Promise((resolve, reject) => {
		const tx = db.transaction('nodes', 'readwrite');
		const store = tx.objectStore('nodes');
		const request = store.clear();

		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}

export async function deleteDB (): Promise<void> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.deleteDatabase(DB_NAME);

		request.onsuccess = () => {
			dbInstance = null;
			resolve();
		};

		request.onerror = () => reject(request.error);

		request.onblocked = () => {
			console.warn('Database deletion is blocked. Please close other tabs using this DB.');
		};
	});
}
