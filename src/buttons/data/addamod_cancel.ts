import {
	Button,
	type IdButtonData
} from ".."

import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import {
	type ButtonBuilder,
	ButtonStyle,
	type Interaction
} from "discord.js"

import { execute } from "../execute/addamod_cancel"

export const getData = (interaction: Interaction): IdButtonData => {
	const lang: string = getLangFromInteraction(interaction)

	const button: ButtonBuilder = new Button({
		id: `addamod_cancel?user_id=${interaction.user.id}`,
		style: ButtonStyle.Secondary,
		label: translate("buttons.addamod.cancel.label", lang)
	})

	return {
		component: button,
		id: 'addamod_cancel',
		execute
	}
}