import Arrow from "$lib/assets/icons/ArrowIcon.svelte";

export default {
    title: "components/Icons/ArrowIcon",
    component: Arrow,
    tags: ['autodocs'],
    args: {
        direction: 'right',
        width: 24,
        height: 24,
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
    args: { width: 48, height: 48 },
};

export const Accessible = {
    args: { hidden: false, title: "Continue" },
};