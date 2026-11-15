<script>
import { Heading, Paragraph } from '$lib/components/atoms'
	let { newsItem } = $props()
</script>

<article>
	<h3>{newsItem.title}</h3>
    <p>{newsItem.type}</p>
</article>