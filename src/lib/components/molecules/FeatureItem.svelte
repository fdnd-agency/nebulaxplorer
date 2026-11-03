<script>
  import ContentAccordion from "$lib/components/atoms/ContentAccordion.svelte";

  let { index, total, title, intro, details, image, alt = "" } = $props();
</script>

<div class="feature-item">
  <article>
    <div class="feature-content-wrapper">
      <span>{index}/{total}</span>
      <div class="feature-content">
        <h3>{title}</h3>
        <p>{intro}</p>
        <ContentAccordion>
          <p>{details}</p>
        </ContentAccordion>
      </div>
    </div>
    <div class="feature-image-wrapper">
      <img src={image} {alt} />
    </div>
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
      border-radius: 50px 0 50px 0;

      @container feature-item (min-width: 48rem) {
        height: 400px;
      }
    }
  }
</style>
