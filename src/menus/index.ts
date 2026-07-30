import type {
	Executable,
	SelectMenuBuilder
} from '../utils/types'

import type {
	DataId,
	Data
} from '../utils/interfaces'

import type {
	AnySelectMenuInteraction,
	Interaction
} from 'discord.js'

import * as addamod from './data/addamod'
import * as config from './data/config'

import { isASelectMenu } from '../bot'
import { removeVars } from '../utils'

/**
 * Executable type for menus
 */
export type MenuExecutable = Executable<AnySelectMenuInteraction>
/**
 * Data type for menus
 */
export type IdMenuData = DataId<SelectMenuBuilder, MenuExecutable>

/**
 * Get the menus list
 * @param interaction Interaction
 * @param params Parameters list
 * @returns Menus list
 */
export const getMenusList = (interaction: Interaction, params?: Record<string, any>): IdMenuData[] => {
	const menus: {
		getData: (interaction: Interaction, params?: Record<string, any>) => IdMenuData
	}[] = [
		addamod,
		config
	]
	const list: IdMenuData[] = []
	for (const menu of menus) {
		list.push(menu.getData(interaction, params))
	}

	return list
}

/**
 * Get a menu's data
 * @param interaction Interaction
 * @param id Menu's id
 * @param params Parameters list
 * @returns Menu data
 */
export const getData = (interaction: Interaction, id: string, params?: Record<string, any>): Data<SelectMenuBuilder, MenuExecutable> => {
	const menus: IdMenuData[] = getMenusList(interaction, params)

	for (const data of menus) {
		if (removeVars(id) === data.id) return data
	}
	
	throw new Error(`Menu with id ${removeVars(id)} not found`)
}

/**
 * Get a menu
 * @param interaction Interaction
 * @param id Menu's id
 * @param params Parametesr list
 * @returns A menu
 */
export const getSelect = (interaction: Interaction, id: string, params?: Record<string, any>): SelectMenuBuilder => getData(interaction, id, params).component
/**
 * Get a menu's executable
 * @param interaction Interaction
 * @param id Menu's id
 * @returns Execute of a menu
 */
export const getExecute = (interaction: Interaction, id: string): MenuExecutable => getData(interaction, id).execute

/**
 * Handle a menu event
 * @param interaction Interaction
 */
export const handleMenus = async (interaction: Interaction): Promise<any> => {
	if (!isASelectMenu(interaction)) throw new Error('Not a menu')

	const id: string = interaction.customId
	const execute: MenuExecutable = getExecute(interaction, id)
	return await execute(interaction)
}