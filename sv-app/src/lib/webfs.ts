import type { NodeDS, NodeType } from "./types";

function generateUUID (): string {
	return crypto.randomUUID();
}

export function getEmptyNode (params: {
	name: string;
	type: NodeType;
	parentId: string
}): NodeDS {
	const now = Date.now();
	const isFile = params.type === 'file';

	return {
		id: generateUUID(),
		name: params.name,
		parentId: params.parentId,
		type: params.type,
		isDirectory: !isFile,
		isFile,

		content: '',
		createdAt: now,
		updatedAt: now,

		icon: '', // let UI decide default
		isFavorite: false,
		tags: [],
		color: '',
		order: 0,
		readOnly: false,
		hidden: false,
		size: 0,

		mimeType: isFile ? 'text/plain' : 'inode/directory',
		openedAt: now
	};
}
