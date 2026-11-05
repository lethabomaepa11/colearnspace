<script>
	let { id, title, children } = $props();
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog {id} class="modal">
	<div class="modal-box">
		{#if title}
			<span class="flex w-full items-center justify-between text-lg font-bold"
				><h1>{title}</h1>
				<button class="btn btn-circle btn-sm" onclick={() => document.getElementById(id).close()}
					>✕</button
				>
			</span>
		{/if}
		<div class="space-y-3">
			{@render children()}
		</div>
	</div>
</dialog>
