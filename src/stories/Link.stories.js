import Link from "$lib/components/atoms/Link.svelte";

export default {
    title: "components/Atoms/link",
    component: Link,
    tags: ['autodocs'],
    args: {
        href: "/",
        text: "Bekijk alles",
        size: "sm",
        bold: true,
        stretched: false,
    },
    argTypes: {
        size: { control: "select", options: ["sm", "md", "lg"] },
        color: { control: "color" },
        bold: { control: "boolean" },
        text: { control: "text" },
        hiddenText: { control: "text" },
        href: { control: "text" },
        classes: { control: "text" },
        stretched: { control: "boolean"}
    },
};

export const Small = { args: { size: "sm" } };
export const Medium = { args: { size: "md" } };
export const Large = { args: { size: "lg" } };

export const Bold = { args: { bold: true } };

export const CustomColor = {
    args: { color: 'var(--color-accent-mid)', bold: true },
};

export const HiddenText = {
    args: { hiddenText: ": assignments" },
};

export const Stretched = {
    args: { stretched: true, hiddenText: "screenreadertext" },
    parameters: { docs: { story: { inline: false, iframeHeight: 120 } } }
};