import {
	MessageFlags,
	type TextDisplayBuilder,
	type ButtonInteraction,
	ContainerBuilder
} from "discord.js"

import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import {
	extractVars,
	wrapInTextDisplay
} from "../../utils"

export const execute = async (interaction: ButtonInteraction): Promise<any> => {
	const lang: string = getLangFromInteraction(interaction)
	const vars: URLSearchParams = extractVars(interaction.customId)
	if (interaction.user.id !== vars.get('user_id')) return await interaction.reply({
			components: [],
			content: translate("menus.addamod.uidNotCorrect", lang),
			flags: MessageFlags.Ephemeral
		})
		
	const text: string = translate("buttons.addamod.cancel.cmdCanceled", lang)
	const textDisplay: TextDisplayBuilder = wrapInTextDisplay(text)

	await interaction.update({
		components: [ textDisplay ]
	})

}