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
        color="var(--card-accent)" 
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
        --card-accent: light-dark(var(--color-accent-mid), var(--color-accent-darker));
        /*
        --card-bg: light-dark(var(--color-neutral-lightest), var(--color-brand-darkest));
        --card-text: light-dark(var(--color-brand-darkest), var(--color-neutral-lightest));
        --card-accent: light-dark(var(--color-accent-darker), var(--color-accent-mid));
        */

        background-color: var(--card-bg);
        color: var(--card-text);

        border-color: var(--color-brand-darkest);
        border: solid 0.2rem;
        border-top: solid 0.4rem var(--card-accent);
        padding: var(--spacing-lg);
        overflow: hidden;

        &.light { color-scheme: light; }
        &.dark  { color-scheme: dark; }
    }

    h3{
        text-wrap: balance;
    }

    p:first-of-type{
        position: relative;
        color: var(--card-accent);
        padding-top: var(--spacing-lg);
        font-size: var(--font-size-body-sm);
        border-top: 0.2rem solid var(--card-accent);
        font-weight: bold;
    }

    p:last-of-type{
        margin-top: var(--spacing-xs);
        font-size: var(--font-size-body-md);
    }


    /*container en subgrid*/
    .card {
        grid-row: span 4;
        display: grid;
        grid-template-rows: subgrid;
        gap: var(--spacing-xs);
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
    }
</style>