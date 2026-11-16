<script>
    import { Heading, Image, TextDate } from '$lib/components/atoms'
	let { newsItem } = $props()
</script>

<article>
    {#if newsItem.image}
		<Image src={newsItem.image} ratio="wide" rounded={false} label={newsItem.type} overlay={true}/>
	{/if}
    <header class="prose">
        <Heading headingLevel={5} theme="dark">{newsItem.title}</Heading>
        <TextDate date={newsItem.date} theme="dark">{newsItem.date}</TextDate>
    </header>
</article>

<style>
    article{
        display: flex;
        flex-direction: column;
        width: 35vw;
    }
    header{
        padding: var(--spacing-sm);
    }
</style>