import {
	ActionRowBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	TextDisplayBuilder,
	type ComponentEmojiResolvable,
	type MessageActionRowComponentBuilder
} from "discord.js"

export const wrapInRow = (...args: any[]) => new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(...args)
export const wrapInTextDisplay = (str: string) => new TextDisplayBuilder().setContent(str)
export const removeVars = (str: string): string => str.substring(0, str.indexOf('?') === -1 ? undefined : str.indexOf('?'))
export const r = (elem: Record<number | string, any> | Array<any> | undefined, key: number | string) => elem?.[key]
export const embedPing = (name: string, id: string): string => `[__**@${name}**__](https://discord.com/users/${id})`
export const readOnlyArr = (array: readonly string[]): string[] => array.join('➕➖').split('➕➖') // I'll never use this combinaison (➕➖)

export const arrayRand = (array: any[]): any => {
	return array[Math.floor(Math.random() * array.length)]
}

export const createStringSelectMenu = (array: {
	label: string,
	description: string,
	value: string,
	default?: boolean,
	emoji?: ComponentEmojiResolvable
}[]): StringSelectMenuBuilder => {
	const finalArray: StringSelectMenuOptionBuilder[] = []
	for (const obj of array) {
		const option = new StringSelectMenuOptionBuilder()
			.setLabel(obj.label)
			.setDescription(obj.description)
			.setValue(obj.value)
			.setDefault(obj.default || false)
		if (obj.emoji) {
			option.setEmoji(obj.emoji)
		}

		finalArray.push(option)
	}
	return new StringSelectMenuBuilder().addOptions(finalArray)
}

export const extractVars = (str: string): URLSearchParams => {
	return new URLSearchParams(new URL(`http://${str}`).search)
}

export const embedPings = (params: {
	name: string,
	id: string
}[]): string => params.map(m => embedPing(m.name, m.id)).join(', ')