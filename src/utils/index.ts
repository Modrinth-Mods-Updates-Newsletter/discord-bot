import {
	ActionRowBuilder,
	ChannelSelectMenuInteraction,
	MentionableSelectMenuInteraction,
	RoleSelectMenuInteraction,
	StringSelectMenuBuilder,
	StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
	TextDisplayBuilder,
	UserSelectMenuInteraction,
	type AnySelectMenuInteraction,
	type ComponentEmojiResolvable,
	type Interaction,
	type MessageActionRowComponentBuilder
} from "discord.js"

/**
 * Wrap components in an action row
 * @param args Components
 * @see {@link ActionRowBuilder}
 */
export const wrapInRow = (...args: any[]) => new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(...args)
/**
 * Wrap a string into a text display
 * @param str String
 * @see {@link TextDisplayBuilder}
 */
export const wrapInTextDisplay = (str: string) => new TextDisplayBuilder().setContent(str)
/**
 * Remove variables from a string
 * @param str String
 */
export const removeVars = (str: string): string => str.substring(0, str.indexOf('?') === -1 ? undefined : str.indexOf('?'))
/**
 * Navigate into an array or an object or undefined
 * @param elem Array or object
 * @param key Number or string
 * @returns Your element or undefined
 */
export const r = (elem: Record<number | string, any> | Array<any> | undefined, key: number | string) => elem?.[key]
/**
 * Embed a mention without pinging the person
 * @param name Person's name
 * @param id Person's id
 */
export const embedPing = (name: string, id: string): string => `[__**@${name}**__](https://discord.com/users/${id})`
/**
 * Transform a readonly array into a simple array. idk why i put this but there it is x)
 * @param array Readonly array
 * @returns Array
 */
export const readOnlyArr = (array: readonly string[]): string[] => array.join('➕➖').split('➕➖') // I'll never use this combinaison (➕➖)

/**
 * Take a random card into multiple ones
 * @param array A filled array
 */
export const arrayRand = (array: any[]): any => {
	return array[Math.floor(Math.random() * array.length)]
}

/**
 * Get vars from a string like a URL
 * @param str String
 * @returns Variables
 */
export const extractVars = (str: string): URLSearchParams => {
	return new URLSearchParams(new URL(`http://${str}`).search)
}

/**
 * Embed multiples mentions without pinging the persons
 * @param params An array with objects with the person's name and the person's id
 * @returns String
 */
export const embedPings = (params: {
	name: string,
	id: string
}[]): string => params.map(m => embedPing(m.name, m.id)).join(', ')

export const isASelectMenu = (interaction: Interaction): interaction is AnySelectMenuInteraction => {
	return interaction instanceof StringSelectMenuInteraction ||
		   interaction instanceof MentionableSelectMenuInteraction ||
		   interaction instanceof RoleSelectMenuInteraction ||
		   interaction instanceof UserSelectMenuInteraction ||
		   interaction instanceof ChannelSelectMenuInteraction
}