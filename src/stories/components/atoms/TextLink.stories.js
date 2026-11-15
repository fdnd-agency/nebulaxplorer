import { createRawSnippet } from "svelte";
import TextLink from "$lib/components/atoms/TextLink.svelte";

// TextLink verwacht een children-snippet, dus we maken er hier een van.
// De <span> is nodig omdat een snippet één root-element moet hebben.
const snippet = (text) =>
    createRawSnippet(() => ({
        render: () => `<span>${text}</span>`,
    }));

export default {
    title: "components/Atoms/textLink",
    component: TextLink,
    tags: ['autodocs'],
    args: {
        href: "/",
        children: snippet("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"),
    },
    argTypes: {
        href: { control: "text" },
        children: { control: false },
    },
};

export const Default = {};