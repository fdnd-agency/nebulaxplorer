import Arrow from "$lib/assets/icons/Arrow.svelte";

export default {
    title: "components/Icons/Arrow",
    component: Arrow,
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
    args: { hidden: false, title: "Continue" },
};