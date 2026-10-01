<script>
    let expanded = $state(false);

	function toggleMenu() {
		expanded = !expanded;
	}
</script>

<button class=".hamburger-button" aria-label={expanded ? 'Sluit menu' : 'Open menu'} aria-expanded={expanded} onclick={toggleMenu}>
    <svg fill="var(--color-brand-darkest)" class="hamburger" viewBox="0 0 100 100" width="100" title="hamburger icoon" aria-hidden="true">
        <rect class="line top" width="80" height="10" x="10" y="25" rx="5"></rect>
        <rect class="line middle" width="80" height="10" x="10" y="45" rx="5"></rect>
        <rect class="line bottom" width="80" height="10" x="10" y="65" rx="5"></rect>
    </svg>
</button> 

<style>
    button {
		background: var(--color-accent-dark);
		border: none;
        padding: 1rem;

        svg{
            width: 2rem;
        }

		.line {
			transition: 1s;
			transform-origin: center;
		}
	}

	button[aria-expanded='true'] :is(.top, .bottom) {
		y: 45;
	}
	button[aria-expanded='true'] .top {
		rotate: 45deg;
	}
	button[aria-expanded='true'] .bottom {
		rotate: -45deg;
	}
	button[aria-expanded='true'] .middle {
		opacity: 0;
	}

</style>