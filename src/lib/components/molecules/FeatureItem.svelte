<script>
  import ContentAccordion from "$lib/components/atoms/ContentAccordion.svelte";

  let { index, total, title, intro, details, image, alt = "" } = $props();
</script>

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

<style>
  article {
    color: var(--color-neutral-lightest);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    border-bottom: 1px solid var(--color-neutral-lightest);
    padding-bottom: var(--spacing-xl);

    @media (min-width: 768px) {
      flex-direction: row;
      gap: var(--spacing-2xl);
      justify-content: space-between;
    }
  }

  .feature-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);

    @media (min-width: 768px) {
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

    @media (min-width: 768px) {
      height: 400px;
    }
  }
</style>
