import {
	type ChatInputCommandInteraction,
	type ModalBuilder,
	SlashCommandBuilder,
	type SlashCommandStringOption
} from "discord.js"

import { getLangFromInteraction } from "../i18n"
import { getModal } from "../modals"

export const data = new SlashCommandBuilder()
	.setName('config')
	.setDescription('Change something about the bot\'s behaviour')
	.addStringOption((option: SlashCommandStringOption) =>
		option
			.setName('system')
			.setDescription('The system you want to configure')
			.addChoices(
				{
					name: 'Follow a mod\'s updates',
					value: 'addamod'
				}
			)
	)
	.setContexts(0, 1, 2)
	.setIntegrationTypes(0, 1)

export const execute = async (interaction: ChatInputCommandInteraction) => {
	const system: string | null = interaction.options.getString("system")

	const lang: string = getLangFromInteraction(interaction)

	switch (system) {
		case "addamod": {
			const modal: ModalBuilder = getModal("addamod", lang)
			await interaction.showModal(modal)

			break
		}

		default: {
			
		}
	}
}