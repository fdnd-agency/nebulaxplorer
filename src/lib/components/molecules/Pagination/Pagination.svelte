<script>
	import { page } from '$app/state'
	import Arrow from '$lib/assets/logos/Arrow.svelte'
	import './pagination.css'

	const { pagination, contrast = 'white-on-space' } = $props()

	const jobs = [
		{
			id: 1,
			role: 'Technical Engineer',
			location: 'Leiden',
			slug: '',
		},
		{
			id: 2,
			role: 'Astrophysics Data Analysis Intern',
			location: 'Leiden',
			slug: '',
		},
		{
			id: 3,
			role: 'Astrophysics Data Analysis Intern',
			location: 'Leiden',
			slug: '',
		},
		{
			id: 4,
			role: 'Astrophysics Data Analysis Intern',
			location: 'Leiden',
			slug: '',
		},
		{
			id: 5,
			role: 'Astrophysics Data Analysis Intern',
			location: 'Leiden',
			slug: '',
		},
		{
			id: 6,
			role: 'Astrophysics Data Analysis Intern',
			location: 'Leiden',
			slug: '',
		},
	]
</script>

{#if pagination.totalPages > 1}
	<nav class="heading pagination-container {contrast}">
		<!-- Previous button -->
		{#if pagination.currentPage > 1}
			<a
				href={`${page.url.pathname}?page=${pagination.currentPage - 1}`}
				class="pagination-indicator previous"
				aria-label="Previous page">
				<Arrow height="20" width="12" rotate="180deg" />
			</a>
		{:else}
			<span
				class="pagination-indicator disabled previous"
				aria-hidden="true">
				<Arrow height="20" width="12" rotate="180deg" />
			</span>
		{/if}

		{#each pagination.items as item, index}
			{#if item !== '-'}
				<a
					href={`${page.url.pathname}?page=${item}`}
					class={`pagination-indicator ${pagination.currentPage === item ? 'active' : ''}`}>
					{item}
				</a>
			{:else}
				<div class="separator-container">
					<span class="pagination-separator">{item}</span>
					<form
						method="GET"
						action=""
						onsubmit={(e) => {
							// Allow the GET navigation to happen
							// but reset the input value immediately
							setTimeout(() => e.target.reset())
						}}
						class="heading pagination-dictator">
						<!-- The reason we have an empty placeholder here is for CSS styling, to check if the input is filled -->
						<input
							class="enhanced-navigation"
							type="number"
							name="page"
							id="navigation-input-{index}"
							min="1"
							max={pagination.totalPages}
							placeholder="" />
					</form>
				</div>
			{/if}
		{/each}

		<!-- Next button -->
		{#if pagination.currentPage < pagination.totalPages}
			<a
				href={`${page.url.pathname}?page=${pagination.currentPage + 1}`}
				class="heading pagination-indicator"
				aria-label="Next page">
				<Arrow height="20" width="12" />
			</a>
		{:else}
			<span
				class="heading pagination-indicator disabled"
				aria-hidden="true"><Arrow height="20" width="12" /></span>
		{/if}
	</nav>
{/if}

<style>
	nav.pagination-container {
		justify-content: center;
		align-items: center;
		display: flex;
		gap: 1rem;

		--arrow-color: var(--cleanroom-100);
		--text-color: var(--white);

		&.white-on-space & {
			--arrow-color: var(--space-100);
			--text-color: var(--white);
		}

		&.space-on-gray {
			--arrow-color: var(--ultra-170);
			--text-color: var(--space-100);
		}

		&.white-on-cleanroom {
			--arrow-color: var(--space-100);
			--text-color: var(--white);
		}

		color: var(--text-color);

		container-type: inline-size;
		container-name: pagination;

		.pagination-indicator {
			&.active {
				text-decoration: underline;
				font-weight: 700;
			}

			&:first-child,
			&:last-child {
				color: var(--arrow-color);

				&.disabled {
					opacity: 0.6;
				}
			}
		}

		.separator-container {
			position: relative;
			display: flex;

			.pagination-dictator {
				display: none;
			}

			.pagination-separator {
				position: relative;
			}

			.enhanced-navigation {
				background: transparent;
				width: 2ch;
				height: 1em;
				position: relative;
			}
		}

		@container pagination (min-width: 900px) {
			.separator-container {
				&:has(
					:focus-within,
					.enhanced-navigation:not(:placeholder-shown)
				) {
					.pagination-separator {
						opacity: 0;
					}
				}
				.pagination-dictator {
					display: inline;
				}

				.pagination-separator {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					display: block;
					width: 100%;
					text-align: center;
					height: 100%;
				}
			}
		}
	}
</style>
