import {
	type ModalSubmitInteraction,
	type ModalBuilder
} from 'discord.js'

import * as addamod from './addamod'
import { getLangFromInteraction } from '../i18n'

export interface Data {
	id: string,
	modal: ModalBuilder,
	execute: (interaction: ModalSubmitInteraction) => any
}

export const getModalsList = (lang: string): Data[] => {
	const modals: {
		getData: (lang: string) => Data
	}[] = [
		addamod
	]
	const list: Data[] = []
	for (const modal of modals) {
		list.push(modal.getData(lang))
	}

	return list
}

export const getModal = (id: string, lang: string): {
	modal: ModalBuilder,
	execute: (interaction: ModalSubmitInteraction) => any
} => {
	const modals: Data[] = getModalsList(lang)

	for (const data of getModalsList(lang)) {
		if (id === data.id) 
			return {
				modal: data.modal,
				execute: data.execute
			}
	}
	
	throw new Error(`Modal with id ${id} not found`)
}

export const handleModals = async (interaction: ModalSubmitInteraction): Promise<any> => {
	const lang = getLangFromInteraction(interaction)
	const id = interaction.customId

	const modal = getModal(id, lang)
	return await modal.execute(interaction)
}