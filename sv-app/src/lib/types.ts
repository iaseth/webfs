
export type NodeType = 'directory' | 'file';

export interface NodeDS {
	id: string;
	name: string;
	parentId: string;
	type: NodeType;
	isDirectory: boolean,
	isFile: boolean,

	content: string;
	createdAt: number;
	updatedAt: number;

	icon: string;
	tags: string[];
	color: string;
	order: number;
	size: number;

	favorited: boolean;
	readOnly: boolean;
	hidden: boolean;
	deleted: boolean;
	deletedAt: number; // time when last deleted/restored

	mimeType: string;
	openedAt: number;
}
