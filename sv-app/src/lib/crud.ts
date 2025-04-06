import type { NodeDS } from './types';
import { STORE_NAME, openDatabase } from './db';
import { getEmptyNode } from './webfs';



export async function doesNameExistInDB (name: string, parentId: string): Promise<boolean> {
	const db = await openDatabase();
	return new Promise((resolve) => {
		const tx = db.transaction('nodes', 'readonly');
		const store = tx.objectStore('nodes');
		const index = store.index('parentId');
		const request = index.getAll(parentId);

		request.onsuccess = () => {
			const siblings = request.result as NodeDS[];
			const conflict = siblings.some(node => node.name === name);
			resolve(conflict);
		};

		request.onerror = () => resolve(false);
	});
}

// 🆕 Create
export async function addNodeIntoDB (node: NodeDS): Promise<boolean> {
	const exists = await doesNameExistInDB(node.name, node.parentId);
	if (exists) {
		console.log(`Already exists: '${node.parentId}/${node.name}'`);
		return Promise.resolve(true);
	}

	console.log(`Adding '${node.parentId}/${node.name}'`);
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, 'readwrite');
		const store = tx.objectStore(STORE_NAME);
		const req = store.add(node);

		req.onsuccess = () => resolve(false);
		req.onerror = () => reject(req.error);
	});
}

export async function addEmptyFileIntoDB (name: string, parentId: string): Promise<boolean> {
	const fileNode = getEmptyNode({ name, type: 'file', parentId });
	return addNodeIntoDB(fileNode);
}

export async function addEmptyFolderIntoDB (name: string, parentId: string): Promise<boolean> {
	const folderNode = getEmptyNode({ name, type: 'folder', parentId });
	return addNodeIntoDB(folderNode);
}

// 📖 Read One
export async function getNodeFromDB (id: string): Promise<NodeDS | undefined> {
	const db = await openDatabase();
	const tx = db.transaction(STORE_NAME, 'readonly');
	const store = tx.objectStore(STORE_NAME);
	return new Promise((resolve) => {
		const req = store.get(id);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => resolve(undefined);
	});
}

// 📖 Get All
export async function getAllNodesFromDB (): Promise<NodeDS[]> {
	const db = await openDatabase();
	const tx = db.transaction(STORE_NAME, 'readonly');
	const store = tx.objectStore(STORE_NAME);
	return new Promise((resolve) => {
		const req = store.getAll();
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => resolve([]);
	});
}

// 📖 Get by Parent
export async function getChildrenFromDB (parentId: string | null): Promise<NodeDS[]> {
	const db = await openDatabase();
	const tx = db.transaction(STORE_NAME, 'readonly');
	const store = tx.objectStore(STORE_NAME);
	const index = store.index('parentId');

	return new Promise((resolve) => {
		const req = index.getAll(parentId);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => resolve([]);
	});
}

// ✏️ Update
export async function updateNodeIntoDB (id: string, updates: Partial<NodeDS>): Promise<void> {
	const db = await openDatabase();
	const tx = db.transaction(STORE_NAME, 'readwrite');
	const store = tx.objectStore(STORE_NAME);
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
export async function deleteNodeFromDB (id: string): Promise<void> {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, 'readwrite');
		const store = tx.objectStore(STORE_NAME);
		const req = store.delete(id);

		req.onsuccess = () => resolve();
		req.onerror = () => reject(req.error);
	});
}
