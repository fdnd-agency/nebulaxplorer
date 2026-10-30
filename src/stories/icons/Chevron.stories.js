import Chevron from "$lib/assets/icons/Chevron.svelte";

export default {
    title: "components/Icons/Chevron",
    component: Chevron,
    tags: ['autodocs'],
    args: {
        width: 8.374,
        height: 14.734,
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
    args: { width: 16.748, height: 29.468 },
};

export const Accessible = {
    args: { hidden: false, title: "Next" },
};