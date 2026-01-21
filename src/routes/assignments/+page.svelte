<script>
    import AssignmentCards from "$lib/components/molecules/AssigmentCards/AssignmentCards.svelte";
  const { data } = $props();
  const { vacancies: assignments } = data;
</script>

<AssignmentCards {assignments}/>