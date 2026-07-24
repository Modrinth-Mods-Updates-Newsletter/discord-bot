import {
	type ActionRowBuilder,
	type ButtonBuilder,
	ButtonStyle,
	type ChatInputCommandInteraction,
	ContainerBuilder,
	type MessageActionRowComponentBuilder,
	MessageFlags,
	type ModalBuilder,
	SlashCommandBuilder,
	type SlashCommandStringOption,
	type TextDisplayBuilder
} from "discord.js"

import {
	getLangFromInteraction,
	translate
} from "../i18n"

import {
	wrapInRow,
	wrapInTextDisplay
} from "../utils"

import { getModal } from "../modals"
import { clientId } from "../bot"
import { LINKS } from "../constants"
import { Button } from "../buttons"
import { getSelect } from "../menus"

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
			const text: string = translate('containers.config.principalText', lang, {
				botId: clientId || '',
				discordGuild: LINKS.DISCORD_GUILD.CONFIG,
				docsLink: LINKS.BOT_WEBSITE.DOCUMENTATION,
				panelLink: LINKS.BOT_WEBSITE.PANEL,
			})

			const textDisplay: TextDisplayBuilder = wrapInTextDisplay(text)

			const guildInvitButton: ButtonBuilder = new Button({
				style: ButtonStyle.Link,
				label: translate('buttons.config.guildInvit', lang),
				url: LINKS.DISCORD_GUILD.CONFIG
			})

			const documentationButton: ButtonBuilder = new Button({
				style: ButtonStyle.Link,
				label: translate('buttons.config.documentation', lang),
				url: LINKS.BOT_WEBSITE.DOCUMENTATION
			})

			const panelButton: ButtonBuilder = new Button({
				style: ButtonStyle.Link,
				label: translate('buttons.config.panel', lang),
				url: LINKS.BOT_WEBSITE.PANEL
			})

			const buttonActionRow: ActionRowBuilder<MessageActionRowComponentBuilder> = wrapInRow(
				guildInvitButton,
				documentationButton,
				panelButton
			)

			const menu = getSelect(interaction, 'config_select')
			const menuActionRow = wrapInRow(menu)

			const container = new ContainerBuilder()
				.addTextDisplayComponents(textDisplay)
				.addActionRowComponents(
					menuActionRow,
					buttonActionRow
				)

			await interaction.reply({
				flags: MessageFlags.IsComponentsV2,
				components: [ container ]
			})
		}
	}
}