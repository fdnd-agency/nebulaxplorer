import { createRawSnippet } from "svelte";
import Button from "$lib/components/atoms/Button.svelte";

const arrow = createRawSnippet(() => ({
    render: () => `
        <svg width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    `,
}));

export default {
    title: "components/Atoms/Button",
    component: Button,
    tags: ['autodocs'],
    args: {
        text: "Button",
        variant: "primary-solid",
        type: "button",
        disabled: false,
        iconPosition: "after"
    },
    argTypes: {
        variant: { 
            control: "select", 
            options: ["primary-solid", "primary-outline", "secondary-solid", "secondary-outline"]
        },
        text: { control: "text" },
        href: { control: "text" },
        type: { control: "select", options: ["button", "submit", "reset"] },
        disabled: { control: "boolean" },
        iconPosition: { control: "inline-radio", options: ["before", "after"] },
        classes: { control: "text" },
        icon: { control: false },
        onclick: { action: "clicked" }
    },
};

export const PrimarySolid = {
    args: { variant: "primary-solid", text: "Primary Solid" }
};

export const PrimaryOutline = {
    args: { variant: "primary-outline", text: "Primary Outline" }
};

export const SecondarySolid = {
    args: { variant: "secondary-solid", text: "Secondary Solid" }
};

export const SecondaryOutline = {
    args: { variant: "secondary-outline", text: "Secondary Outline" }
};

export const IconBefore = {
    args: { text: "Icon before", icon: arrow, iconPosition: "before" }
};

export const SecondarySolidIconAfter = {
    args: { variant: "secondary-solid", text: "Secondary Solid", icon: arrow, iconPosition: "after" }
};

export const PrimaryOutlineIconAfter = {
    args: { variant: "primary-outline", text: "Primary Outline", icon: arrow, iconPosition: "after" }
};

export const SecondaryOutlineIconBefore = {
    args: { variant: "secondary-outline", text: "Secondary Outline", icon: arrow, iconPosition: "before" }
};
