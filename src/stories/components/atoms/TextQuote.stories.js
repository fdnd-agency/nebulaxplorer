import { createRawSnippet } from "svelte";
import TextQuote from "$lib/components/atoms/TextQuote.svelte";

// TextQuote verwacht een children-snippet, dus we maken er hier een van.
// De <span> is nodig omdat een snippet één root-element moet hebben.
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
        author: "Lorem Ipsum",
        source: "Dolor Sit Amet",
        children: snippet("Ut enim ad minim veniam, quis nostrud exercitation"),
    },
    argTypes: {
        variant: { control: "select", options: ["inline", "big"] },
        author: { control: "text" },
        source: { control: "text" },
        children: { control: false },
    },
};

export const Inline = { args: { variant: "inline" } };

export const Big = { args: { variant: "big" } };

export const BigWithoutAuthor = {
    args: { variant: "big", author: undefined, source: undefined },
};

export const BigWithoutSource = {
    args: { variant: "big", source: undefined },
};

export const BigLongText = {
    args: {
        variant: "big",
        children: snippet(
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ),
    },
};