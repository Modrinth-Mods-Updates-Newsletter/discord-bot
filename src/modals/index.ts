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

/**
 * Executable type for modals
 */
export type ModalExecutable = Executable<ModalSubmitInteraction>
/**
 * Data type for modals
 */
export type IdModalData = DataId<ModalBuilder, ModalExecutable>

/**
 * Get the modals list
 * @param lang Lang
 * @returns Modals list
 */
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

/**
 * Get a modal's data
 * @param id Modal's id
 * @param lang Lang
 * @returns Modal's data
 */
export const getData = (id: string, lang: string): IdModalData => {
	const modals: IdModalData[] = getModalsList(lang)

	for (const data of modals) {
		if (id === data.id) return data
	}
	
	throw new Error(`Modal with id ${id} not found`)
}

/**
 * Get a modal
 * @param id Modal's id
 * @param lang Lang
 * @returns A modal
 */
export const getModal = (id: string, lang: string): ModalBuilder => getData(id, lang).component
/**
 * Get a modal's executable
 * @param id Modal's id
 * @param lang Lang
 * @returns The executable of a modal
 */
export const getExecute = (id: string, lang: string): ModalExecutable => getData(id, lang).execute

/**
 * Handle a modal event
 * @param interaction Interaction
 */
export const handleModals = async (interaction: ModalSubmitInteraction): Promise<any> => {
	const lang: string = getLangFromInteraction(interaction)
	const id: string = interaction.customId

	const execute: ModalExecutable = getExecute(id, lang)
	return await execute(interaction)
}