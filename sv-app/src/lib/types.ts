
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
	isFavorite: boolean;
	tags: string[];
	color: string;
	order: number;
	readOnly: boolean;
	hidden: boolean;
	size: number;

	mimeType: string;
	openedAt: number;
}
