import { createRawSnippet } from "svelte";
import TextLink from "$lib/components/atoms/TextLink.svelte";

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
        theme: "auto",
        children: snippet("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"),
    },
    argTypes: {
        href: { control: "text" },
        theme: { control: "select", options: ["auto", "light", "dark"] },
        children: { control: false },
    },
};

export const Default = {};