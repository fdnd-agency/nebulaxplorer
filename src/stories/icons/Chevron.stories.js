import Chevron from "$lib/assets/icons/Chevron.svelte";

export default {
    title: "components/Icons/Chevron",
    component: Chevron,
    tags: ['autodocs'],
    args: {
        direction: 'right',
        width: 8.374,
        height: 14.734,
        hidden: true,
        title: "",
    },
    argTypes: {
        direction: {
			control: 'select',
			options: ['up', 'down', 'left', 'right']
		},
        width: { control: "number" },
        height: { control: "number" },
        hidden: { control: "boolean" },
        title: { control: "text" },
    },
};

export const Default = {};

export const Up = {
	args: { direction: 'up' }
}

export const Down = {
	args: { direction: 'down' }
}

export const Left = {
	args: { direction: 'left' }
}

export const Right = {
	args: { direction: 'right' }
}

export const Large = {
    args: { width: 16.748, height: 29.468 },
};

export const Accessible = {
    args: { hidden: false, title: "Next" },
};