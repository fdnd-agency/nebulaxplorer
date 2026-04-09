<script>
	import { resolve } from '$app/paths'
	let { teams } = $props()
	const startDate = new Date(teams.time_start)
	const endDate = new Date(teams.time_end)

	const month = [
		'januari',
		'februari',
		'maart',
		'april',
		'mei',
		'juni',
		'juli',
		'augustus',
		'september',
		'october',
		'november',
		'december',
	]
</script>

<li>
	<img
		src={`https://fdnd-agency.directus.app/assets/${teams.group_photo}`}
		alt="" />
	<a href={resolve('/team/' + teams.id)}
		><h3>
			{month[startDate.getMonth()]} - {month[endDate.getMonth()]}
		</h3></a>
</li>

<style>
	li {
		position: relative;
		align-self: center;
		max-width: 300px;
		text-align: center;
		width: 100%;

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
		outline: 0.125rem dashed var(--cleanroom-140);
	}

	a:hover {
		text-decoration: underline;
	}

	a::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	h3 {
		padding-block: 0.5lh;
	}

	img {
		max-width: 100%;
	}
</style>
