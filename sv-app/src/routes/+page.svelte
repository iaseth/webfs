
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

	let isDev = $state(false);
	$effect(() => {
		isDev = import.meta.env.DEV && window?.location.hostname === 'localhost';
	});
</script>

<svelte:head>
	<title>WebFS</title>
</svelte:head>

<section class="h-screen w-full overflow-hidden flex">
	<aside class="w-64 h-full overflow-y-auto bg-base-300 px-3 py-6 flex flex-col" hidden={!isDev}>
		<header class="prose text-center py-6">
			<h3>WebFS</h3>
			<p class="-mt-2 text-sm">Files in the Browser!</p>
		</header>

		<section class="grid py-6 gap-y-4">
			<button class="btn btn-primary" onclick={populateDummyFS}>Populate</button>
			<button class="btn" onclick={clearDB}>Clear</button>
			<button class="btn" onclick={deleteDB}>Delete</button>
		</section>

		<section class="grow"></section>

		<footer class="text-center">
			<a class="link" href="https://github.com/iaseth/localprompt">GitHub</a>
		</footer>
	</aside>

	<main class="flex-1 h-full flex items-center justify-center overflow-y-auto">
		<article class="prose">
			<h1>Welcome to WebFS</h1>

			

			{#await currentDirectoryItems}
				Loading...
			{:then currentDirectoryItems}
				Found {currentDirectoryItems.length} items
			{/await}
		</article>
	</main>
</section>
