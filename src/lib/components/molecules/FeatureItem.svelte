<script>
  import ContentAccordion from "$lib/components/atoms/ContentAccordion.svelte";

  let {
    index,
    total,
    title,
    requirements = [],
    image,
    alt = "",
    loading = "lazy",
  } = $props();
</script>

<div class="feature-item">
  <article>
    <div class="feature-content-wrapper">
      <span>{index}/{total}</span>
      <div class="feature-content">
        <h3>{title}</h3>
        <ul class="requirements">
          {#each requirements as requirement, i}
            <li>
              <p class="requirement-intro">{requirement.intro}</p>

              {#if requirement.details}
                <ContentAccordion hiddenLabel="about {title}">
                  <p>{requirement.details}</p>
                </ContentAccordion>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <figure class="feature-image-wrapper">
      <enhanced:img
        src={image}
        {alt}
        sizes="(min-width: 48rem) 50vw, 100vw"
        {loading}
      />
    </figure>
  </article>
</div>

<style>
  .feature-item {
    container-type: inline-size;
    container-name: feature-item;

    article {
      color: var(--color-neutral-lightest);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
      border-bottom: 1px solid var(--color-neutral-lightest);
      padding-bottom: var(--spacing-xl);

      @container feature-item (min-width: 48rem) {
        flex-direction: row;
        gap: var(--spacing-2xl);
        justify-content: space-between;
      }
    }

    .feature-content-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);

      @container feature-item (min-width: 48rem) {
        flex-direction: row;
        gap: var(--spacing-lg);
        align-items: baseline;
      }

      .requirements {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);

        .requirement-intro {
          font-weight: bold;
        }
      }
    }

    span {
      color: var(--color-accent-mid);
      font-family: var(--font-heading);
      font-weight: bold;
      display: contents;
    }

    img {
      height: 300px;
      width: 100%;
      object-fit: cover;
      border-radius: var(--border-radius);

      @container feature-item (min-width: 48rem) {
        height: 400px;
      }
    }
  }
</style>
