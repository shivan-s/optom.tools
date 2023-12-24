<div {...$$restProps}>
	<slot />
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: end;
		justify-content: center;
		gap: 1rem;
	}
</style>
