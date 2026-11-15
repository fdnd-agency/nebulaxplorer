<script>
    import { Heading, Paragraph, Image } from '$lib/components/atoms'
	let { newsItem } = $props()
</script>

<article class="prose">
    {#if newsItem.image}
		<Image src={newsItem.image} ratio="wide" rounded={false} label={newsItem.type} overlay={true}/>
	{/if}
	<Heading headingLevel={5} theme="dark">{newsItem.title}</Heading>
    <time datetime={newsItem.date}>{newsItem.date}</time>
</article>

<style>
    article{
        display: flex;
        flex-direction: column;
        width: 20vw;
        margin: 3rem;
    }
    time{
        font-style: italic;
        font-size: var(--font-size-body-sm);
        color: light-dark(var(--color-brand-dark), var(--color-neutral-light));
    }
</style>