import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import {
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	type Interaction
} from "discord.js"

import type { DataId } from "../../utils/interfaces"
import type { SelectMenuBuilder } from "../../utils/types"
import type { MenuExecutable } from ".."
import { execute } from "../execute/config"
import { EMOJIS } from "../../constants"

export const getData = (interaction: Interaction, params?: Record<string, any>): DataId<SelectMenuBuilder, MenuExecutable> => {
	const lang = getLangFromInteraction(interaction)
	const options = getOptions(lang)

	const menu = new StringSelectMenuBuilder()
		.setCustomId(`config_select?user_id=${interaction.user.id}`)
		.setMinValues(1)
		.setMaxValues(1)
		.setPlaceholder(translate('menus.config.placeholder', lang))
		.addOptions(options)

	return {
		id: 'config_select',
		component: menu,
		execute
	}
}

export const getOptions = (lang: string) => [
	new StringSelectMenuOptionBuilder()
		.setLabel(translate('menus.options.config.addamod.label', lang))
		.setValue('addamod')
		.setEmoji(EMOJIS.FABRIC_ICON)
		.setDescription(translate('menus.options.config.addamod.description', lang))
]