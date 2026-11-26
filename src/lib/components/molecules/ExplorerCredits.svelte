<script>
	import { text } from '$lib/state/language.svelte.js'
</script>

<footer class="explorer-credits">
	<p>
		<span>{text('missionCredit')}</span>
		<img src="/media/sron-logo.png" width="66" height="16" alt="SRON" />
	</p>
</footer>

<style>
	.explorer-credits {
		margin-top: var(--spacing-xl);
		color: var(--explorer-text-muted);
		font-family: var(--font-caption);
		font-size: var(--font-size-body-sm);
		line-height: var(--line-height-normal);

		p {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--spacing-sm);
		}

		img {
			width: auto;
			height: 1rem;
		}
	}
</style>
