import {
	type ModalSubmitInteraction,
	type ModalBuilder
} from 'discord.js'

import * as addamod from './addamod'
import { getLangFromInteraction } from '../i18n'

export interface ModalData {
	modal: ModalBuilder,
	execute: (interaction: ModalSubmitInteraction) => any
}

export interface Data extends ModalData {
	id: string
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

export const getData = (id: string, lang: string): ModalData => {
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
export const getModal = (id: string, lang: string): ModalBuilder => getData(id, lang).modal
export const getExecute = (id: string, lang: string): ((interaction: ModalSubmitInteraction) => any) => getData(id, lang).execute

export const handleModals = async (interaction: ModalSubmitInteraction): Promise<any> => {
	const lang = getLangFromInteraction(interaction)
	const id = interaction.customId

	const execute = getExecute(id, lang)
	return await execute(interaction)
}