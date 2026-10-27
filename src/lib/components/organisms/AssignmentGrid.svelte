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
