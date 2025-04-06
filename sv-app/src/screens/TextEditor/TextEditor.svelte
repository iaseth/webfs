
<script lang="ts">
	interface Props {
		currentFileId: string,
		closeFile: () => void,
	}
	let { currentFileId, closeFile }: Props = $props();

	function onclick () {
		closeFile();
	}
</script>

<section class="px-6 py-12">
	<h4>File: {currentFileId}</h4>
	<button class="btn" {onclick}>Close</button>
</section>
