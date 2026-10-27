<script>
    let { data } = $props();
    let assignment = $derived(data.assignment);
</script>

<svelte:head>
    <title>{ assignment.title } - NebulaXPlorer</title>
</svelte:head>

<p>test is this the correct detail page ?</p>
<p>{ assignment.title }</p>
<p>{ assignment.id }</p>