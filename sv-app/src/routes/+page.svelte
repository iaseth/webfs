
<script lang="ts">
	import { addEmptyFileIntoDB, addEmptyDirectoryIntoDB } from "$lib/crud";
	import { clearDB, deleteDB } from "$lib/db";
	import FileManager from "../screens/FileManager/FileManager.svelte";
	import TextEditor from "../screens/TextEditor/TextEditor.svelte";

	let currentDirectoryId: string = $state('');
	let currentFileId: string = $state('');

	const openFile = (id: string) => currentFileId = id;
	const openDirectory = (id: string) => currentDirectoryId = id;
	const closeFile = () => currentFileId = '';

	function populateDummyFS () {
		addEmptyFileIntoDB('foo.txt', currentDirectoryId);
		addEmptyFileIntoDB('bar.txt', currentDirectoryId);
		addEmptyFileIntoDB('cat.txt', currentDirectoryId);
		addEmptyFileIntoDB('dog.txt', currentDirectoryId);

		addEmptyDirectoryIntoDB('code', currentDirectoryId);
		addEmptyDirectoryIntoDB('ebooks', currentDirectoryId);
		addEmptyDirectoryIntoDB('images', currentDirectoryId);
		addEmptyDirectoryIntoDB('audios', currentDirectoryId);
		addEmptyDirectoryIntoDB('videos', currentDirectoryId);
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

	<main class="flex-1 h-full overflow-y-auto">
		{#if currentFileId}
			<TextEditor {currentFileId} {closeFile} />
		{:else}
			<FileManager {currentDirectoryId} {openFile} {openDirectory} />
		{/if}
	</main>
</section>
