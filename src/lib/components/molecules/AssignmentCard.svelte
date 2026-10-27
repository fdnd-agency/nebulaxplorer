<script>
    import Link from "../atoms/Link.svelte";
    let { assignment, theme = "light" } = $props();
</script>

<article class={ ["card", "prose", theme] }>
    <h3>{ assignment.title }</h3>
    <p>{ assignment.study_program }</p>
    <p>{ assignment.description }</p>
    <Link 
        href="/assignments/{assignment.id}" 
        text="Read more" 
        color="var(--card-accent)" 
        bold 
        stretched 
        hiddenText=": {assignment.title}"
    />
</article>

<style>
    
</style>