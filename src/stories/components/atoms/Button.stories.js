import Button from "$lib/components/atoms/Button.svelte";

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