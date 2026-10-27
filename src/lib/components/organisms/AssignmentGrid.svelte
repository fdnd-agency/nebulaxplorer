<script>
    import AssignmentCard from "../molecules/AssignmentCard.svelte";

    let { assignments = [] } = $props();
</script>

<ul>
    {#each assignments as assignment (assignment.id)}
        <li>
            <AssignmentCard { assignment } />
        </li>
    {/each}
</ul>

<style>
    ul{
        list-style: none;
        display: grid;
        grid-auto-flow: dense;
        gap: var(--spacing-lg);
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
        grid-auto-rows: auto auto 1fr auto;
        container-type: inline-size;
        container-name: assignments;
    }
    li{
        display: grid;
        grid-row: span 4;
        grid-template-rows: subgrid;
    }
    
</style>