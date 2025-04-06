
<script lang="ts">
	import type { NodeDS } from "$lib/types";

	interface Props {
		node: NodeDS
	}
	let { node }: Props = $props();
</script>

<div class="text-center space-y-3">
	<div class="p-12 bg-base-200 rounded-md"></div>
	<p>{node.name}</p>
</div>
