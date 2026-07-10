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

import { getLangFromInteraction } from '../i18n'
import { removeVars } from '../utils'

import * as addamod_continue from './data/addamod_continue'
import * as addamod_cancel from './data/addamod_cancel'
import * as addamod_skip from './data/addamod_skip'

export type ButtonExecutable = Executable<ButtonInteraction>
export type IdButtonData = DataId<ButtonBuilder, ButtonExecutable>

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

export const getData = (id: string, interaction: Interaction): IdButtonData => {
	const buttons: IdButtonData[] = getButtonsList(interaction)

	for (const data of buttons) {
		if (removeVars(id) === data.id) return data
	}
	
	throw new Error(`Button with id ${id} not found`)
}
export const getButton = (id: string, interaction: Interaction): ButtonBuilder => getData(id, interaction).component
export const getExecute = (id: string, interaction: Interaction): ButtonExecutable => getData(id, interaction).execute

export const handleButtons = async (interaction: ButtonInteraction): Promise<any> => {
	const lang: string = getLangFromInteraction(interaction)
	const id: string = interaction.customId

	const execute: ButtonExecutable = getExecute(id, interaction)
	return await execute(interaction)
}

export class Button extends ButtonBuilder {
	constructor (params: {
		style: number,
		label: string,
		id: string,
		emoji?: ComponentEmojiResolvable,
		url?: string,
		disabled?: boolean
	}) {
		super()
		this.setStyle(params.style)
			.setCustomId(params.id)
			.setLabel(params.label)
		switch (true) {
			case !!params.emoji: {
				this.setEmoji(params.emoji)
			}
			case !!params.url: {
				this.setURL(params.url)
			}
			case !!params.disabled: {
				this.setDisabled(params.disabled)
			}
		}
	}
}