import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import {
	MessageFlags,
	type ModalBuilder,
	type StringSelectMenuInteraction
} from "discord.js"

import { extractVars } from "../../utils"
import { getModal } from "../../modals"

export const execute = async (interaction: StringSelectMenuInteraction): Promise<any> => {
	const lang: string = getLangFromInteraction(interaction)
	const vars = extractVars(interaction.customId)

	if (vars.get('user_id') !== interaction.user.id) {
		return await interaction.reply({
			flags: MessageFlags.Ephemeral,
			content: translate('menus.addamod.uidNotCorrect', lang)
		})
	}

	const choice: string = interaction.values[0]
	switch (choice) {
		case 'addamod': {
			const modal: ModalBuilder = getModal("addamod", lang)
			await interaction.showModal(modal)

			break
		}

		default: throw new Error('Choice not found')
	}
}