import { createRawSnippet } from "svelte";
import Heading from "$lib/components/atoms/Heading.svelte";

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
        theme: "auto",
        subheading: undefined,
        subheadingPosition: "above",
        children: snippet("NEBULA – Xplorer stands for “Netherlands Educational Satellite for Exploration of Binary-Linked Astrophysics – X-ray Observer”."),
    },
    argTypes: {
        headingLevel: { control: "select", options: [1, 2, 3, 4, 5, 6] },
        theme: { control: "select", options: ["auto", "light", "dark"] },
        subheading: { control: "text" },
        subheadingPosition: { control: "inline-radio", options: ["above", "below"] },
        children: { control: false },
    },
};

export const Dark = {
    args: { theme: "dark" }
};

export const Light = {
    args: { theme: "light" }
};

export const SubheadingAbove = {
    args: { theme: "light", subheading: "Over de missie", subheadingPosition: "above" }
};

export const SubheadingBelow = {
    args: { theme: "light", subheading: "Over de missie", subheadingPosition: "below" }
};