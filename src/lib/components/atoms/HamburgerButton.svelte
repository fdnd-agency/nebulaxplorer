<!--
    Props:
    - close     boolean - shows a cross instead of the three lines
    - label     string - text for screen readers, default "Menu" / "Sluit menu"
    - onclick   function - without it, the button opens the site menu
                (popover #menu); with it, the button does something else,
                e.g. open the satellite explorer
    - classes   string - extra classes
    - ...rest   other attributes (aria-controls, aria-expanded, ...)
-->

<script>
	let {
		close = false,
		label,
		onclick,
		classes,
		...rest
	} = $props()
</script>

<button
	type="button"
	class={[classes, { close }]}
	popovertarget={onclick ? undefined : 'menu'}
	popovertargetaction={onclick ? undefined : close ? 'hide' : 'show'}
	{onclick}
	{...rest}
>
	<span class="visually-hidden"
		>{label ?? (close ? 'Sluit menu' : 'Menu')}</span
	>
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
		padding: var(--spacing-md);
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
