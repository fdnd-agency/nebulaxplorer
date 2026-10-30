import Close from "$lib/assets/icons/Close.svelte";

export default {
    title: "components/Icons/Close",
    component: Close,
    tags: ['autodocs'],
    args: {
        width: 24,
        height: 24,
        hidden: true,
        title: "",
    },
    argTypes: {
        width: { control: "number" },
        height: { control: "number" },
        hidden: { control: "boolean" },
        title: { control: "text" },
    },
};

export const Default = {};

export const Large = {
    args: { width: 48, height: 48 },
};

export const Accessible = {
    args: { hidden: false, title: "Close" },
};