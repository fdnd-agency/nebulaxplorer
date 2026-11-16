import { createRawSnippet } from 'svelte'
import TextDate from '$lib/components/atoms/TextDate.svelte'

const text = (value) =>
	createRawSnippet(() => ({
		render: () => `<span>${value}</span>`,
	}))

export default {
	title: 'components/Atoms/TextDate',
	component: TextDate,
	tags: ['autodocs'],
	args: {
		date: '2025-11-05',
		theme: 'auto',
		children: text('5 November 2025'),
	},
	argTypes: {
		date: { control: 'text' },
		theme: { control: 'select', options: ['auto', 'light', 'dark'] },
		children: { control: false },
	},
}

export const Default = {}

export const Auto = { args: { theme: 'auto' } }
export const Light = { args: { theme: 'light' } }
export const Dark = { args: { theme: 'dark' } }

export const ShortFormat = {
	args: { children: text('05-11-2025') },
}

export const WithRelativeText = {
	args: { children: text('Last week') },
}