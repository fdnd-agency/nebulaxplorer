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
