<script>
    import mertenImage from "$lib/assets/images/merten.jpg";
    import rushilImage from "$lib/assets/images/rushil.jpg";

    let { testimonials } = $props();

   
</script>

<article class="testimonial-container">
    {#each testimonials as testimonial}
        <div class="testimonial-card">
            <img
                src={testimonial.image}
                alt={testimonial.name}
                class="testimonial-image"
            />
            <div class="testimonial-content">
                <h2>{testimonial.name}</h2>
                <span>{testimonial.time}</span>
                <span>{testimonial.status}</span>
                <span>{testimonial.institution}</span>
                <p>"{testimonial.testimonial}"</p>
            </div>
        </div>
    {/each}
</article>

<style>
    .testimonial-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 1fr;
        gap: 1.5rem;
        max-width: 87.5rem;
        margin: 0 auto;
        padding: 2rem;
        min-height: 100vh;
    }

    .testimonial-card {
        background: var(--space-100);
        backdrop-filter: blur(0.625rem);
        border-radius: 0.5rem;
        padding: 1.5rem;
        display: flex;
        gap: 1rem;
        box-shadow: 0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.3);
        transition: box-shadow 0.3s ease;
    }

    .testimonial-card:hover {
        box-shadow: 0 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.4);
    }

    .testimonial-image {
        width: 5rem;
        height: 5rem;
        border-radius: 0.5rem;
        object-fit: cover;
        flex-shrink: 0;
        border: 1px solid var(--cleanroom-100);
    }

    .testimonial-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
    }

    /* .testimonial-info {
        margin-bottom: 1rem;
    } */

    .testimonial-card h2 {
        color: var(--white);
        font-weight: 600;
        font-size: 1rem;
        margin: 0 0 0.25rem 0;
    }

    .testimonial-card span {
        color: var(--light-grey);
        font-size: 0.75rem;
        display: block;
        margin: 0.125rem 0;
    }

    .testimonial-card p {
        color: #d1d5db;
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 0;
        padding-top: 1rem;
        border-top: 0.0625rem solid var(--cleanroom-100);
        flex: 1;
    }

    /* Desktop: grotere foto en 2 kolommen vanaf 48rem (768px) */
    @media (min-width: 48rem) {
        .testimonial-container {
            grid-template-columns: repeat(2, 1fr);
        }

        .testimonial-image {
            width: 8rem;
            height: 8rem;
        }

        .testimonial-card {
            gap: 1.5rem;
        }
    }
</style>
