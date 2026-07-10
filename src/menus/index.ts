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
import { isASelectMenu } from '../bot'
import { removeVars } from '../utils'

export type MenuExecutable = Executable<AnySelectMenuInteraction>
export type IdMenuData = DataId<SelectMenuBuilder, MenuExecutable>

export const getMenusList = (interaction: Interaction, params?: Record<string, any>): IdMenuData[] => {
	const menus: {
		getData: (interaction: Interaction, params?: Record<string, any>) => IdMenuData
	}[] = [
		addamod
	]
	const list: IdMenuData[] = []
	for (const menu of menus) {
		list.push(menu.getData(interaction, params))
	}

	return list
}

export const getData = (interaction: Interaction, id: string, params?: Record<string, any>): Data<SelectMenuBuilder, MenuExecutable> => {
	const menus: IdMenuData[] = getMenusList(interaction, params)

	for (const data of menus) {
		if (removeVars(id) === data.id) return data
	}
	
	throw new Error(`Menu with id ${removeVars(id)} not found`)
}
export const getSelect = (interaction: Interaction, id: string, params?: Record<string, any>): SelectMenuBuilder => getData(interaction, id, params).component
export const getExecute = (interaction: Interaction, id: string): MenuExecutable => getData(interaction, id).execute

export const handleMenus = async (interaction: Interaction): Promise<any> => {
	if (!isASelectMenu(interaction)) throw new Error('Not a menu')

	const id: string = interaction.customId
	const execute: MenuExecutable = getExecute(interaction, id)
	return await execute(interaction)
}