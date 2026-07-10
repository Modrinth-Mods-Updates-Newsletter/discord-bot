import {
	ContainerBuilder,
	MessageFlags,
	type TextDisplayBuilder,
	type ButtonInteraction,
	ThumbnailBuilder,
	SectionBuilder
} from "discord.js"

import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import {
	extractVars,
	r,
	wrapInTextDisplay
} from "../../utils"

import { EMOJIS } from "../../constants"
import { fetchModrinthAPI } from "../../apis/modrinth"

export const execute = async (interaction: ButtonInteraction): Promise<any> => {
	const lang: string = getLangFromInteraction(interaction)
	const vars: URLSearchParams = extractVars(interaction.customId)
	if (interaction.user.id !== vars.get('user_id')) return await interaction.reply({
			components: [],
			content: translate("menus.addamod.uidNotCorrect", lang),
			flags: MessageFlags.Ephemeral
		})

	await interaction.deferUpdate()

	const msgContent: string = r(r(r(r(r(interaction.message.components, 0), 'components'), 0), 'data'), 'content')

	let match: RegExpMatchArray | null
	do {
		match = msgContent.match(/^### Is this good\?\n> Mod slug: ([\w!@\$\(\)`.+,"\-']+)\n> Selected loaders: ([A-Za-z, ]+)\n> Bypass snapshots: (yes|no)\n> Mention\(s\): ((\[__\*\*\`@[^\n]+\`\*\*__\]\(https:\/\/discord\.com\/users\/&?(\d+)\)(, \[__\*\*\`@[^\n]+\`\*\*__\]\(https:\/\/discord\.com\/users\/&?(\d+)\))*)|nothing)$/)
		if (match) break
		match = msgContent.match(/^### Est-ce correct \?\n> Slug du mod : ([\w!@\$\(\)`.+,"\-']+)\n> Lanceurs de mods sélectionnés : ([A-Za-z, ]+)\n> Passer outre les snapshots : (yes|no)\n> Mention\(s\) : ((\[__\*\*\`@[^\n]+\`\*\*__\]\(https:\/\/discord\.com\/users\/&?(\d+)\)(, \[__\*\*\`@[^\n]+\`\*\*__\]\(https:\/\/discord\.com\/users\/&?(\d+)\))*)|nothing)$/)
		if (match) break
		console.error('Wrong text:', msgContent)
		return
	} while (0)

	const slug: string = match[1]
	const ids: string[] = [...msgContent.matchAll(/https:\/\/discord\.com\/users\/(&?\d+)/g)].map(m => m[1])
	
	await editReply(interaction, 0)
	const {
		modName,
		imgUrl
	} = await fetchModrinthAPI(slug)
	if (modName) await editReply(interaction, 1, modName)
	else return await editReply(interaction, 2)

	const modNameTextDisplay: TextDisplayBuilder = wrapInTextDisplay(`### ${modName}`),
		trackTextDisplay: TextDisplayBuilder = wrapInTextDisplay(translate("containers.addamod.saveMod", lang, {
			"0largeEmoji": EMOJIS.TRUE,
			"0joinEmojiEnd": EMOJIS.TRUE_JOIN_END,
			"1largeEmoji": EMOJIS.TRUE,
			"1joinEmojiEnd": EMOJIS.TRUE_JOIN_END
		})),
		finalTextDisplay: TextDisplayBuilder = wrapInTextDisplay(translate("containers.addamod.modSaved", lang, { modName }))

	const thumbnail = new ThumbnailBuilder()
		.setURL(`https://images.weserv.nl/?url=${imgUrl?.substring(8)}&w=8192`)

	const trackSection = new SectionBuilder()
		.setThumbnailAccessory(thumbnail)
		.addTextDisplayComponents(trackTextDisplay)

	const trackContainer = new ContainerBuilder()
		.addSectionComponents(trackSection)
	const finalContainer = new ContainerBuilder()
		.addTextDisplayComponents(finalTextDisplay)

	await interaction.editReply({
		flags: MessageFlags.IsComponentsV2,
		components: [
			modNameTextDisplay,
			trackContainer,
			finalContainer
		]
	})
}

export const editReply = (interaction: ButtonInteraction, index: number, modName?: string): Promise<any> => {
	const lang: string = getLangFromInteraction(interaction)

	const paramsArray: Record<string, string>[] = [
		{
			"0largeEmoji": EMOJIS.ON,
			"0joinEmojiEnd": EMOJIS.ON_JOIN_END,
			"1largeEmoji": EMOJIS.ON,
			"1joinEmojiEnd": EMOJIS.ON_JOIN_END
		},
		{
			"0largeEmoji": EMOJIS.TRUE,
			"0joinEmojiEnd": EMOJIS.TRUE_JOIN_END,
			"1largeEmoji": EMOJIS.TRUE,
			"1joinEmojiEnd": EMOJIS.TRUE_JOIN_END
		},
		{
			"0largeEmoji": EMOJIS.FALSE,
			"0joinEmojiEnd": EMOJIS.FALSE_JOIN_END,
			"1largeEmoji": EMOJIS.FALSE,
			"1joinEmojiEnd": EMOJIS.FALSE_JOIN_END
		}
	]

	const textDisplay: TextDisplayBuilder = wrapInTextDisplay(`### ${modName}` || ':')
	const textDisplayContainer: TextDisplayBuilder = wrapInTextDisplay(translate("containers.addamod.saveMod", lang, paramsArray[index]))
	const container = new ContainerBuilder()
		.addTextDisplayComponents(textDisplayContainer)

	return interaction.editReply({
		flags: MessageFlags.IsComponentsV2,
		components: modName ? [
			textDisplay,
			container
		] : [ container ]
	})
}