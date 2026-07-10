import type {
	DataId
} from "../../utils/interfaces"

import type {
	SelectMenuBuilder
} from "../../utils/types"

import type {
	MenuExecutable
} from ".."

import {
	MentionableSelectMenuBuilder,
	type Interaction
} from "discord.js"

import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import { execute } from "../execute/addamod"

export const getData = (interaction: Interaction, params?: Record<string, any>): DataId<SelectMenuBuilder, MenuExecutable> => {
	const lang = getLangFromInteraction(interaction)
	const menu = new MentionableSelectMenuBuilder()
		.setCustomId(`mention_select?user_id=${interaction.user.id}`) // sl = mod slug, lo = loaders, sn = snapshots.
		.setMinValues(1)
		.setMaxValues(25)
		.setPlaceholder(translate("containers.addamod.mentions.placeholder", lang))

	return {
		id: 'mention_select',
		component: menu,
		execute
	}
}	