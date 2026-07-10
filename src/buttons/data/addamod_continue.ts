import {
	Button,
	type IdButtonData
} from ".."

import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import {
	ButtonStyle,
	type Interaction
} from "discord.js"

import { execute } from "../execute/addamod_continue"

export const getData = (interaction: Interaction): IdButtonData => {
	const lang = getLangFromInteraction(interaction)

	const button = new Button({
		id: `addamod_continue?user_id=${interaction.user.id}`,
		style: ButtonStyle.Success,
		label: translate("buttons.addamod.continue.label", lang)
	})

	return {
		component: button,
		id: 'addamod_continue',
		execute
	}
}