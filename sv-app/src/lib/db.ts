const DB_NAME = 'webfs';
const DB_VERSION = 1;
const STORE_NAME = 'nodes';

let db: IDBDatabase;

export function openDatabase(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => {
			reject(request.error);
		};

		request.onsuccess = () => {
			db = request.result;
			resolve(db);
		};

		request.onupgradeneeded = () => {
			db = request.result;

			if (!db.objectStoreNames.contains(STORE_NAME)) {
				const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });

				// Indexes for faster access
				store.createIndex('parentId', 'parentId', { unique: false });
				store.createIndex('type', 'type', { unique: false });
				store.createIndex('createdAt', 'createdAt', { unique: false });
				store.createIndex('updatedAt', 'updatedAt', { unique: false });
				store.createIndex('openedAt', 'openedAt', { unique: false });
				store.createIndex('isFavorite', 'isFavorite', { unique: false });
			}
		};
	});
}
