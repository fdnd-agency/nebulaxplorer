<script>
    let { id, anchor, title, summary } = $props();
</script>

<details name="components">
    <summary><span>{id}</span><a href="#{anchor}">{title}</a></summary>
    <p id="{anchor}">{summary}</p> 
</details>

<style>
	summary {
		cursor: pointer;
		display: flex;
		gap: var(--spacing-lg);
		padding: var(--spacing-sm);
		list-style: none;

		&:hover {
			background-color:#26273E;
		}
		span {
            color: var(--color-accent-dark);
        }
	}

	summary::after {
  		content: "▶ ";
		margin-left: auto;
	}

	details[open] summary::after {
  		content: "▼";
	}

    details {
		border-top: 1px solid #4a4a5a;
		margin-top: var(--spacing-lg);
		font-family: var(--font-caption); 

		a {
			text-decoration: none;
		}
		p {
			margin: var(--spacing-md) 0;
			padding-left: 3.5rem;
			font-size: 1rem;
		}
    }

	details[open] summary{
		background-color:#26273E;
		box-shadow: inset 2px 0 0 var(--color-accent-dark);
	}
</style>
