import { createRawSnippet } from "svelte";
import TextQuote from "$lib/components/atoms/TextQuote.svelte";

const snippet = (text) =>
    createRawSnippet(() => ({
        render: () => `<span>${text}</span>`,
    }));

export default {
    title: "components/Atoms/textQuote",
    component: TextQuote,
    tags: ['autodocs'],
    args: {
        variant: "inline",
        theme: "auto",
        author: "Martin Grim",
        source: "SRON",
        children: snippet("The scientific data we collect with this mission is the icing on the cake."),
    },
    argTypes: {
        variant: { control: "select", options: ["inline", "big"] },
        theme: { control: "select", options: ["auto", "light", "dark"] },
        author: { control: "text" },
        source: { control: "text" },
        children: { control: false },
    },
};

export const Inline = { args: { variant: "inline" } };

export const BigLight = { args: { variant: "big", theme: "light" } };

export const BigDark = { args: { variant: "big", theme: "dark" } };