
<script lang="ts">
	import { addEmptyFileIntoDB, getChildrenFromDB } from "$lib/crud";
	import { clearDB, deleteDB } from "$lib/db";

	let currentDirectoryId: string = $state('');
	let currentDirectoryItems = $derived.by(async () => {
		return await getChildrenFromDB(currentDirectoryId);
	});

	function populateDummyFS () {
		addEmptyFileIntoDB('foo.txt', currentDirectoryId);
		addEmptyFileIntoDB('bar.txt', currentDirectoryId);
		addEmptyFileIntoDB('cat.txt', currentDirectoryId);
		addEmptyFileIntoDB('dog.txt', currentDirectoryId);
	}
</script>

<svelte:head>
	<title>WebFS</title>
</svelte:head>

<section class="flex items-center justify-center min-h-screen">
	<article class="prose">
		<h1>Welcome to WebFS</h1>

		<button class="btn btn-primary" onclick={populateDummyFS}>Populate</button>
		<button class="btn btn-primary" onclick={clearDB}>Clear</button>
		<button class="btn btn-primary" onclick={deleteDB}>Delete</button>

		{#await currentDirectoryItems}
			Loading...
		{:then currentDirectoryItems}
			Found {currentDirectoryItems.length} items
		{/await}
	</article>
</section>
