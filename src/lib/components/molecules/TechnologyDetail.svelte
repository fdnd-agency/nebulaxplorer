<script>
  import Button from '$lib/components/atoms/Button.svelte';
  
  let { technology } = $props();
  let imageOrientation = $state('');

  function checkImage(event) {
    const img = event.currentTarget;

    if (img.naturalWidth > img.naturalHeight) {
        imageOrientation = 'landscape';
    } else {
        imageOrientation = 'portrait';
    }
  }
</script>

<article>
    <nav>
        <ul class="breadcrumbs">
            <li><a href="/technology">3D Satelite</a></li>
            <li class="active">{technology.name}</li>
        </ul>
    </nav>

    <h2>{technology.name}</h2>

    <div class={technology.image ? imageOrientation : 'no-image'}>
        <p>{technology.description}</p>

        {#if technology.image}
            <figure>
                <img
                    src={technology.image}
                    alt={technology.name}
                    onload={checkImage}
                    class={imageOrientation}
                />

                {#if technology.imageCredit}
                    <figcaption>
                    {technology.imageCredit}
                    </figcaption>
                {/if}
            </figure>
        {/if}
    </div>
</article>

<style>
    /* even voor het testen */
    article {
        padding-top: 15rem;
        margin-bottom: var(--spacing-xl)
    }
    .landscape {
        p {
            max-width: 900px;
        }
        img {
            width: 50%;
            max-height: 500px;
            object-fit: contain;
            margin-block: var(--spacing-lg);
        }
    }
    .portrait {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        p {
            flex: 1;
            max-width: 900px;
        }
        img {
            display: block;
            width: 100%;
            max-height: 700px;
            object-fit: contain;
        }
    }

    .no-image {
        p {
            max-width: 900px;
        }
    }
</style>