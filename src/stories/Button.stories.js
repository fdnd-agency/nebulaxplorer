import Button from "$lib/components/atoms/Button.svelte";

export default {
    title: "components/button",
    component: Button,
    tags: ['autodocs'],
    args: {
        text: "Button",
        variant: "primary",
        type: "button",
        disabled: false
    },
    argTypes: {
        variant: { control: "select", options: ["primary", "secondary"] },
        type: { control: "select", options: ["button", "submit", "reset"] },
        iconPosition: { control: "select", options: ["before", "after"] },
        disabled: { control: "boolean" },
        text: { control: "text" },
        href: { control: "text" },
        classes: { control: "text" }
    },
};

export const Primary = { args: { variant: "primary" } };
export const Secondary = { args: { variant: "secondary" } };

export const Disabled = { args: { disabled: true } };

export const AsLink = { args: { href: "/" } };