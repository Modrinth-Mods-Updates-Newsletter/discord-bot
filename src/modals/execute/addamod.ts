import {
	type ModalSubmitInteraction
} from "discord.js"

export const execute = async (interaction: ModalSubmitInteraction): Promise<any> => {
	console.log(interaction.isModalSubmit())
}