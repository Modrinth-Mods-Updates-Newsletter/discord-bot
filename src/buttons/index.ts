import type {
	Executable
} from '../utils/types'

import type {
	DataId
} from '../utils/interfaces'

import {
	ButtonBuilder,
	type ComponentEmojiResolvable,
	ButtonInteraction,
	type Interaction
} from 'discord.js'

import { removeVars } from '../utils'

import * as addamod_continue from './data/addamod_continue'
import * as addamod_cancel from './data/addamod_cancel'
import * as addamod_skip from './data/addamod_skip'

/**
 * Executable type for buttons
 */
export type ButtonExecutable = Executable<ButtonInteraction>
/**
 * Data type for buttons
 */
export type IdButtonData = DataId<ButtonBuilder, ButtonExecutable>

/**
 * Get the buttons list
 * @param interaction Interaction
 * @returns Buttons data
 */
export const getButtonsList = (interaction: Interaction): IdButtonData[] => {
	const buttons: {
		getData: (interaction: Interaction) => IdButtonData
	}[] = [
		addamod_continue,
		addamod_cancel,
		addamod_skip
	]
	const list: IdButtonData[] = []
	for (const button of buttons) {
		list.push(button.getData(interaction))
	}

	return list
}

/**
 * Get the data of a button
 * @param id Button's id
 * @param interaction Interaction
 * @returns Button data
 */
export const getData = (id: string, interaction: Interaction): IdButtonData => {
	const buttons: IdButtonData[] = getButtonsList(interaction)

	for (const data of buttons) {
		if (removeVars(id) === data.id) return data
	}
	
	throw new Error(`Button with id ${id} not found`)
}

/**
 * Get a button
 * @param id Button's id
 * @param interaction Interaction
 * @returns A button
 */
export const getButton = (id: string, interaction: Interaction): ButtonBuilder => getData(id, interaction).component
/**
 * Get a button's executable
 * @param id Button's id
 * @param interaction Interaction
 * @returns The execute of a button
 */
export const getExecute = (id: string, interaction: Interaction): ButtonExecutable => getData(id, interaction).execute

/**
 * Handle a button event
 * @param interaction Interaction 
 */
export const handleButtons = async (interaction: ButtonInteraction): Promise<any> => {
	const id: string = interaction.customId

	const execute: ButtonExecutable = getExecute(id, interaction)
	return await execute(interaction)
}

/**
 * A builder simpler than Discord.JS's
 * @constructor {@link Button}
 * @param params -
 * @see {@link ButtonBuilder}
 */
export class Button extends ButtonBuilder {
	constructor (params: {
		style: number,
		label: string,
		id?: string,
		emoji?: ComponentEmojiResolvable,
		url?: string,
		disabled?: boolean
	}) {
		super()
		this.setStyle(params.style)
			.setLabel(params.label)
		switch (true) {
			case !!params.emoji: {
				this.setEmoji(params.emoji)
				break
			}
			case !!params.url: {
				this.setURL(params.url)
				break
			}
			case !!params.disabled: {
				this.setDisabled(params.disabled)
				break
			}
			case !!params.id: {
				this.setCustomId(params.id)
			}
		}
	}
}