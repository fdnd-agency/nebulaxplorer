import { createRawSnippet } from "svelte";
import Heading from "$lib/components/atoms/Heading.svelte";

// Heading verwacht een children-snippet, dus we maken er hier een van.
// De <em> is nodig omdat een snippet één root-element moet hebben.
const snippet = (html) =>
    createRawSnippet(() => ({
        render: () => `<em style="font-style: normal">${html}</em>`,
    }));

export default {
    title: "components/Atoms/heading",
    component: Heading,
    tags: ['autodocs'],
    args: {
        headingLevel: 2,
        theme: "dark",
        children: snippet("Lorem ipsum dolor sit amet"),
    },
    argTypes: {
        headingLevel: { control: "select", options: [1, 2, 3, 4, 5, 6] },
        theme: { control: "select", options: ["dark", "light"] },
        children: { control: false },
    },
};

export const Dark = { args: { theme: "dark" } };

export const Light = {
    args: { theme: "light" }
};

export const WithAccent = {
    args: {
        children: snippet("Lorem ipsum <span>dolor sit</span> amet"),
    }
};

export const LightWithAccent = {
    args: {
        theme: "light",
        children: snippet("Lorem ipsum <span>dolor sit</span> amet"),
    }
};
