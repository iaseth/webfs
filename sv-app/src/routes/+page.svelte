
<script lang="ts">
	import { addEmptyFileIntoDB } from "$lib/crud";
	import { clearDB, deleteDB } from "$lib/db";

	let currentId: string | null = $state(null);

	function populateDummyFS () {
		addEmptyFileIntoDB('foo.txt', '');
		addEmptyFileIntoDB('bar.txt', '');
		addEmptyFileIntoDB('cat.txt', '');
		addEmptyFileIntoDB('dog.txt', '');
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
	</article>
</section>
