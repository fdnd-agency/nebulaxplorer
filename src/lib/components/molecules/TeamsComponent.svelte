<script>
	import { resolve } from '$app/paths'
	let { teams } = $props()
	const startDate = new Date(teams.time_start)
	const endDate = new Date(teams.time_end)

	const month = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
</script>

<li>
	<img
		src={`https://fdnd-agency.directus.app/assets/${teams.group_photo}`}
		alt="" 
		width="300"
		loading="lazy"
		/>

	<a href={resolve('/team/' + teams.id)}
		>
			{month[startDate.getMonth()]} - {month[endDate.getMonth()]}
		</a>
</li>

<style>
	li {
		position: relative; /* this doesnt do anything by itself, but it makes the a::after pseudocontent take the correct position */
		text-align: center;
		
		background-color: var(--space-160);
		
		height: 100%;

		display: grid;
		grid-template-areas: 
		"img" 
		"link";

		grid-template-rows: auto 2.5lh;

		&:hover{
			background-color: #283756;
		}

		@media screen and (min-width: 500px) {
			max-width: 450px;
		}

		/* dit blokje code is vijwel helemaal gekopieëerd vanuit Iris' newscard component*/
		@media (prefers-reduced-motion: no-preference) { /* ALS reduced motion NIET aanstaat; */
			transition: 0.3s ease;	/* (op geleidelijke wijze) */

			&:hover { /* EN ALS er gehoverd wordt */
				transform: translateY(-0.5rem); /* verplaats iets naar boven */
			}
		}
	}

	li:focus-within {
		outline: var(--default-focus);
	}

	a {
		align-self: center;
		grid-area: link;
	}

	a:focus {
		outline: unset;
	}

	a:hover {
		text-decoration: underline;
	}

	a::after {
		content: '';
		position: absolute;
		inset: 0; /*shorthand for left, top, right, and bottom properties */
		}

	

	img {
		align-self: center;
		grid-area: img;
		height: 100%;
		object-fit: contain;
		width: auto;
		max-width: 100%;
	}
</style>
