
<script lang="ts">
	import { getChildrenFromDB } from "$lib/crud";
	import FileManagerNode from "./FileManagerNode.svelte";

	interface Props {
		currentDirectoryId: string
	}
	let { currentDirectoryId }: Props = $props();

	let currentDirectoryItems = $derived.by(async () => {
		return await getChildrenFromDB(currentDirectoryId);
	});
</script>

<section>
	{#await currentDirectoryItems}
		Loading...
	{:then currentDirectoryItems}
		<section class="grid px-6 py-6 gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
			{#each currentDirectoryItems as node (node.id) }
				<FileManagerNode {node} />
			{/each}
		</section>
	{/await}
</section>
