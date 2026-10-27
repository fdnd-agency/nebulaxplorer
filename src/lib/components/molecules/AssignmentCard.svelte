<script>
    import Link from "../atoms/Link.svelte";
    let { assignment, theme = "light" } = $props();
</script>

<article class={ ["card", "prose", theme = "auto"] }>
    <h3>{ assignment.title }</h3>
    <p>{ assignment.study_program }</p>
    <p>{ assignment.description }</p>
    <Link 
        href="/assignments/{assignment.id}" 
        text="Read more" 
        color="var(--color-accent-mid)" 
        bold 
        stretched 
        hiddenText=": about {assignment.title}"
        size="sm"
    />
</article>

<style>
    .card{
        --card-bg:  light-dark( var(--color-brand-darkest), var(--color-neutral-lightest));
        --card-text:  light-dark(var(--color-neutral-lightest), var(--color-brand-darkest));

        background-color: var(--card-bg);
        color: var(--card-text);

        border-color: var(--color-brand-darkest);
        border: solid 0.2rem;
        border-top: solid 0.4rem var(--color-accent-mid);
        padding: var(--spacing-lg);

        &.light { color-scheme: light; }
        &.dark  { color-scheme: dark; }
    }

    h3{
        text-wrap: balance;
    }

    p:first-of-type{
        position: relative;
        color: var(--color-accent-mid);
        padding-top: var(--spacing-lg);
        font-size: var(--font-size-body-sm);
        border-top: 0.2rem solid var(--color-accent-mid);
    }

    p:last-of-type{
        margin-top: var(--spacing-xs);
        font-size: var(--font-size-body-md);
    }
    



    /*tijdelijk*/
    .card{
        font-family: var(--font-heading);
        h3{
            font-family: var(--font-heading);
        }
        p:last-of-type{
            font-family: var(--font-heading);
        }
        margin: 3rem;
    }
</style>