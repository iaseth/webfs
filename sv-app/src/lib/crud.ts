import type { NodeDS } from './types';
import { openDatabase } from './db';

const STORE = 'nodes';

// 🆕 Create
export async function createNode(node: NodeDS): Promise<void> {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, 'readwrite');
		const store = tx.objectStore(STORE);
		const req = store.add(node);

		req.onsuccess = () => resolve();
		req.onerror = () => reject(req.error);
	});
}

// 📖 Read One
export async function getNode(id: string): Promise<NodeDS | undefined> {
	const db = await openDatabase();
	const tx = db.transaction(STORE, 'readonly');
	const store = tx.objectStore(STORE);
	return new Promise((resolve) => {
		const req = store.get(id);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => resolve(undefined);
	});
}

// 📖 Get All
export async function getAllNodes(): Promise<NodeDS[]> {
	const db = await openDatabase();
	const tx = db.transaction(STORE, 'readonly');
	const store = tx.objectStore(STORE);
	return new Promise((resolve) => {
		const req = store.getAll();
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => resolve([]);
	});
}

// 📖 Get by Parent
export async function getChildren(parentId: string | null): Promise<NodeDS[]> {
	const db = await openDatabase();
	const tx = db.transaction(STORE, 'readonly');
	const store = tx.objectStore(STORE);
	const index = store.index('parentId');

	return new Promise((resolve) => {
		const req = index.getAll(parentId);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => resolve([]);
	});
}

// ✏️ Update
export async function updateNode(id: string, updates: Partial<NodeDS>): Promise<void> {
	const db = await openDatabase();
	const tx = db.transaction(STORE, 'readwrite');
	const store = tx.objectStore(STORE);
	const req = store.get(id);

	req.onsuccess = () => {
		const node = req.result;
		if (!node) return;

		const updatedNode = {
			...node,
			...updates,
			updatedAt: Date.now()
		};
		store.put(updatedNode);
	};
}

// 🗑️ Delete
export async function deleteNode(id: string): Promise<void> {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, 'readwrite');
		const store = tx.objectStore(STORE);
		const req = store.delete(id);

		req.onsuccess = () => resolve();
		req.onerror = () => reject(req.error);
	});
}
