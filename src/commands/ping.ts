import {
	type ChatInputCommandInteraction,
	ContainerBuilder,
	MediaGalleryBuilder,
	MediaGalleryItemBuilder,
	MessageFlags,
	SlashCommandBuilder,
	TextDisplayBuilder
} from "discord.js";

import {
	GIFS,
	LANG
} from "../constants";

import {
	getLangFromInteraction,
	translate
} from "../i18n";

import { arrayRand } from "../utils";

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Ping the bot!')
	.setContexts(0, 1, 2)
	.setIntegrationTypes(0, 1)

export const execute = async (interaction: ChatInputCommandInteraction) => {
	const date1: number = Date.now()
	await interaction.deferReply()
	const date2: number = Date.now()
	const ping: number = date2 - date1

	const lang: string = getLangFromInteraction(interaction)

	const text: string = translate("commands.ping.text", lang, { ping: String(ping) })
	const textDisplay = new TextDisplayBuilder().setContent(text)

	const gifUrl: string = arrayRand(GIFS.PONG)
	const mediaGalleryItem = new MediaGalleryItemBuilder().setURL(gifUrl)
	const mediaGallery = new MediaGalleryBuilder().addItems(mediaGalleryItem)

	const container = new ContainerBuilder()
		.addTextDisplayComponents(textDisplay)
		.addMediaGalleryComponents(mediaGallery)

	interaction.editReply({
		components: [container],
		flags: MessageFlags.IsComponentsV2
	}).catch()
}