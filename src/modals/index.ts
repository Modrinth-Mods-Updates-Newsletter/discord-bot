import type {
	Executable
} from '../utils/types'

import type {
	DataId
} from '../utils/interfaces'

import {
	type ModalSubmitInteraction,
	type ModalBuilder
} from 'discord.js'

import * as addamod from './data/addamod'
import { getLangFromInteraction } from '../i18n'

export type ModalExecutable = Executable<ModalSubmitInteraction>
export type IdModalData = DataId<ModalBuilder, ModalExecutable>

export const getModalsList = (lang: string): IdModalData[] => {
	const modals: {
		getData: (lang: string) => IdModalData
	}[] = [
		addamod
	]
	const list: IdModalData[] = []
	for (const modal of modals) {
		list.push(modal.getData(lang))
	}

	return list
}

export const getData = (id: string, lang: string): IdModalData => {
	const modals: IdModalData[] = getModalsList(lang)

	for (const data of modals) {
		if (id === data.id) return data
	}
	
	throw new Error(`Modal with id ${id} not found`)
}
export const getModal = (id: string, lang: string): ModalBuilder => getData(id, lang).component
export const getExecute = (id: string, lang: string): ModalExecutable => getData(id, lang).execute

export const handleModals = async (interaction: ModalSubmitInteraction): Promise<any> => {
	const lang: string = getLangFromInteraction(interaction)
	const id: string = interaction.customId

	const execute: ModalExecutable = getExecute(id, lang)
	return await execute(interaction)
}