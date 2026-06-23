import {
	ActionRowBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	type ComponentEmojiResolvable
} from "discord.js"

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

export const wrapInRow = (...args: any[]) => new ActionRowBuilder().addComponents(args)