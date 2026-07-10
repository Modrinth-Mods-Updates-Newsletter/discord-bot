import {
	MessageFlags,
	type ButtonInteraction
} from "discord.js"

import {
	getContainer,
	verifyText
} from "../../menus/execute/addamod"

import { r } from "../../utils"
import { getOpposites } from "../../utils/dictionnary"
import { store } from "../../bot"

export const execute = async (interaction: ButtonInteraction) => {
	await interaction.deferUpdate()

	const text: string = (r(r(r(r(r(interaction.message.components, 2), 'components'), 0), 'data'), 'content') || '')
	const match: string[] = verifyText(text)

	const slug: string = match[1]
	const loaders: string[] = getOpposites(match[2].split(', '))
	const snapshots: boolean = match[3] === 'yes' ? false : true
	store.registerMod(interaction.user.id, interaction.guild?.id, slug, loaders, !snapshots)

	const container = await getContainer({ slug, loaders, snapshots }, interaction)
	return await interaction.editReply({
		flags: MessageFlags.IsComponentsV2,
		components: [ container ]
	})
}