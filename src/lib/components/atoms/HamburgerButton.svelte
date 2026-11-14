<script>
	let { close = false } = $props();
</script>

<button
	class={{ close }}
	popovertarget="menu"
	popovertargetaction={close ? 'hide' : 'show'}
>
	<span class="visually-hidden">{close ? 'Sluit menu' : 'Menu'}</span>
	<svg
		fill="var(--color-brand-darkest)"
		class="hamburger"
		viewBox="0 0 100 100"
		width="100"
		title="hamburger icoon"
		aria-hidden="true"
	>
		<rect class="line top" width="80" height="5" x="10" y="25" rx="5"
		></rect>
		<rect class="line middle" width="80" height="5" x="10" y="45" rx="5"
		></rect>
		<rect class="line bottom" width="80" height="5" x="10" y="65" rx="5"
		></rect>
	</svg>
</button>

<style>
	button {
		background: var(--color-accent-dark);
		border: none;
		padding: 1rem;
		svg {
			width: 2rem;
		}
		.line {
			transform-origin: center;
		}
	}

	.close {
		:is(.top, .bottom) {
			y: 45px;
		}
		.top {
			rotate: 45deg;
		}
		.bottom {
			rotate: -45deg;
		}
		.middle {
			opacity: 0;
		}
	}
</style>
