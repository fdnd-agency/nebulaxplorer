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
        loading: "lazy",
        sizes: "100vw",
        rounded: true,
        ratio: "auto",
    },
    argTypes: {
        src: { control: false },
        alt: { control: "text" },
        credit: { control: "text" },
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