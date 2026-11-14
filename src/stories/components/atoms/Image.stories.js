import Image from "$lib/components/atoms/Image.svelte";
import foto from "$lib/assets/images/x-ray-reverberation.jpg?enhanced";

export default {
    title: "components/Atoms/image",
    component: Image,
    tags: ['autodocs'],
    args: {
        src: foto,
        alt: "X-ray reverberation",
        credit: "",
        creditPosition: "top",
        label: "",
        labelColor: "accent",
        loading: "lazy",
        sizes: "30vw",
        rounded: true,
        ratio: "auto",
    },
    argTypes: {
        src: { control: false },
        alt: { control: "text" },
        credit: { control: "text" },
        creditPosition: { control: "select", options: ["top", "bottom"] },
        label: { control: "text" },
        labelColor: { control: "select", options: ["brand", "secondary", "accent"] },
        loading: { control: "select", options: ["lazy", "eager"] },
        sizes: { control: "text" },
        rounded: { control: "boolean" },
        ratio: { control: "select", options: ["auto", "square", "landscape", "wide"] },
    },
};

export const Default = {};

export const Square = { args: { ratio: "square" } };
export const Landscape = { args: { ratio: "landscape" } };
export const Wide = { args: { ratio: "wide" } };

export const NotRounded = { args: { rounded: false } };

export const WithCredit = {
    args: { credit: "SRON" },
};

export const CreditTop = {
    args: { credit: "SRON", creditPosition: "top", rounded: false },
};

export const CreditBottom = {
    args: { credit: "SRON", creditPosition: "bottom", rounded: false },
};

export const LabelBrand = {
    args: { rounded: false, label: "Nieuw", labelColor: "brand" },
};

export const LabelSecondary = {
    args: { rounded: false, label: "Nieuw", labelColor: "secondary" },
};

export const LabelAccent = {
    args: { rounded: false, label: "Nieuw", labelColor: "accent" },
};

export const LabelWithCredit = {
    args: {
        rounded: false,
        label: "Active",
        labelColor: "accent",
        credit: "SRON",
        creditPosition: "bottom",
        ratio: "wide",
    },
};