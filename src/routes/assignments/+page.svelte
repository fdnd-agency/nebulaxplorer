<script>
  import Assignments from '$lib/components/molecules/assignments/assignments.svelte';
  export let data;
</script>

<Assignments assignments={data.vacancies} />
