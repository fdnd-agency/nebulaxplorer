import Link from "$lib/components/atoms/Link.svelte";

export default {
    title: "components/Atoms/link",
    component: Link,
    tags: ['autodocs'],
    args: {
        href: "/",
        text: "Bekijk alles",
        size: "sm",
        bold: true
    },
    argTypes: {
        size: { control: "select", options: ["sm", "md", "lg"] },
        color: { control: "color" },
        bold: { control: "boolean" },
        text: { control: "text" },
        href: { control: "text" },
        classes: { control: "text" }
    },
};

export const Small = { args: { size: "sm" } };
export const Medium = { args: { size: "md" } };
export const Large = { args: { size: "lg" } };

export const Bold = { args: { bold: true } };

export const CustomColor = {
    args: { color: 'var(--color-accent-light)', bold: true },
    parameters: { backgrounds: { default: 'dark' } }
};