<script>
    import satelliteImage from "$lib/assets/images/nebula-xplorer.jpg";

    let { data } = $props();
</script>

<section class="mission-brief-container mission-grid">
    <article class="content">
        {#each data.mission as mission (mission.id)}
            {#if mission.type === 'heading-level-1'}
                <h1>{mission.content}</h1>
            {:else if mission.type === 'heading-level-2'}
                <h2>{mission.content}</h2>
            {:else}
                <p>{mission.content}</p>
            {/if}
        {/each}
    </article>

    <figure class="sticky-image-wrapper">
        <img src={satelliteImage} alt="NEBULA-Xplorer satellite" />
    </figure>
</section>

<style>
    .mission-brief-container {
        background-color: var(--space-100);
        color: var(--white);
        padding: 3.125rem;
    }

    .mission-grid {
        display: block;
    }

    .sticky-image-wrapper {
        width: 18.75rem;
        height: 18.75rem;
        margin-bottom: 1.25rem;
        display: flex;
        justify-content: center;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    h1, h2 {
        font-weight: bold;
        color: var(--cleanroom-100);
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 3rem;
    }

    h2 {
        font-size: 2rem;
        margin: 2rem 0 1.25rem;
    }

    p {
        font-size: 1.125rem;
        line-height: 1.5;
        margin-bottom: 1.5rem;
    }

    @media (min-width: 48.0625rem) {
        .mission-grid {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .content {
            width: 60%;
        }

        .sticky-image-wrapper {
            position: sticky;
            top: 50%;
            width: 35%;
            padding-left: 3.125rem;
            margin-bottom: 0;
        }
    }
</style>