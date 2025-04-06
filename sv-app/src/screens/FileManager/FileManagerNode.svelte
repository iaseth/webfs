
<script lang="ts">
	import type { NodeDS } from "$lib/types";

	interface Props {
		node: NodeDS,
		openById: (id: string) => void
	}
	let { node, openById }: Props = $props();

	function onclick () {
		openById(node.id);
	}
</script>

<button class="text-center space-y-3" {onclick}>
	<div class="p-12 bg-base-200 rounded-md"></div>
	<p>{node.name}</p>
</button>
