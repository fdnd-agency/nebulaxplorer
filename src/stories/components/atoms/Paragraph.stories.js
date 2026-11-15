import { createRawSnippet } from "svelte";
import Paragraph from "$lib/components/atoms/Paragraph.svelte";

const snippet = (text) =>
    createRawSnippet(() => ({
        render: () => `<span>${text}</span>`,
    }));

export default {
    title: "components/Atoms/paragraph",
    component: Paragraph,
    tags: ['autodocs'],
    args: {
        theme: "auto",
        children: snippet("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
    },
    argTypes: {
        theme: { control: "select", options: ["auto", "light", "dark"] },
        children: { control: false },
    },
};

export const Light = {
    args: { theme: "light" }
};

export const Dark = {
    args: { theme: "dark" }
};

