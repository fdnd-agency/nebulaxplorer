import Search from "$lib/assets/icons/SearchIcon.svelte";

export default {
    title: "components/Icons/SearchIcon",
    component: Search,
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
			options: ['left', 'right']
		},
        width: { control: "number" },
        height: { control: "number" },
        hidden: { control: "boolean" },
        title: { control: "text" },
    },
};

export const Default = {};

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
    args: { hidden: false, title: "Search" },
};