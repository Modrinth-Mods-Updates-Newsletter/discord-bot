import {
	ButtonStyle,
	type Interaction
} from "discord.js"

import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import { Button } from ".."
import { execute } from "../execute/addamod_skip"

export const getData = (interaction: Interaction) => {
	const lang = getLangFromInteraction(interaction)

	const button = new Button({
		label: translate("containers.addamod.mentions.skip", lang),
		style: ButtonStyle.Secondary,
		id: `addamod_skip?user_id=${interaction.user.id}`
	})

	return {
		component: button,
		id: 'addamod_skip',
		execute
	}
}