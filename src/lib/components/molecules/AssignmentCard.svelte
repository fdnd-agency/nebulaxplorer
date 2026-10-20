<script>
    let { vacancy } = $props()
</script>

<article>
    <h3>{ vacancy.title }</h3>
    <p>{ vacancy.study_program }</p>
    <p>{ vacancy.summary }</p>

    <a href="/assignment/[slug]">Read more</a>
</article>


<style>
    article{
        background-color: var(--color-primary-darkest);
        color: var(--color-neutral-lighter);
        border-top: solid var(--color-accent-darker) 0.2rem;
    }
    
</style>