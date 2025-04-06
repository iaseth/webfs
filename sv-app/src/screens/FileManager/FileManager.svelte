
<script lang="ts">
	import { getChildrenFromDB } from "$lib/crud";
	import type { NodeDS } from "$lib/types";
	import FileManagerNode from "./FileManagerNode.svelte";

	interface Props {
		currentDirectoryId: string,
		openDirectory: (id: string) => void,
		openFile: (id: string) => void,
	}
	let { currentDirectoryId, openDirectory, openFile }: Props = $props();
	let directories: NodeDS[] = $state([]);
	let files: NodeDS[] = $state([])

	let currentDirectoryNodes = $derived.by(async () => {
		let nodes = await getChildrenFromDB(currentDirectoryId);
		directories = nodes.filter(node => node.isDirectory);
		files = nodes.filter(node => node.isFile);
		return nodes;
	});
</script>

<section class="max-w-5xl mx-auto">
	{#await currentDirectoryNodes}
		<!-- Loading... -->
	{:then}
		<section class="grid px-6 py-6 gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
			{#each directories as node (node.id) }
				<FileManagerNode {node} openById={openDirectory} />
			{/each}
			{#each files as node (node.id) }
				<FileManagerNode {node} openById={openFile} />
			{/each}
		</section>
	{/await}
</section>
