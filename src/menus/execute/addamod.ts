import {
	ContainerBuilder,
	MessageFlags,
	type User,
	MentionableSelectMenuInteraction,
	Collection,
	type APIRole,
	Role,
	Guild,
	type Interaction
} from "discord.js"

import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import {
	extractVars,
	wrapInTextDisplay,
	r,
	wrapInRow
} from "../../utils"

import { getOpposites } from "../../utils/dictionnary"
import { getButton } from "../../buttons"
import { store } from "../../bot"

export const execute = async (interaction: MentionableSelectMenuInteraction): Promise<any> => {
	const lang = getLangFromInteraction(interaction)
	const vars: URLSearchParams = extractVars(interaction.customId)
	if (interaction.user.id !== vars.get('user_id'))
		return await interaction.reply({
			content: translate("menus.addamod.uidNotCorrect", lang),
			flags: MessageFlags.Ephemeral
		})

	await interaction.deferUpdate()

	const text: string = (r(r(r(r(r(interaction.message.components, 2), 'components'), 0), 'data'), 'content') || '')
	const match: string[] = verifyText(text)
	const slug: string = match[1]
	const loaders: string[] = getOpposites(match[2].split(', '))
	const snapshots: boolean = match[3] === 'yes' ? false : true
	const users: Collection<string, User> = interaction.users
	const roles: Collection<string, Role | APIRole> = interaction.roles

	store.registerMod(interaction.user.id, interaction.guild?.id, slug, loaders, !snapshots)

	const container = await getContainer({ slug, loaders, snapshots, users, roles }, interaction, interaction.guild)
	return await interaction.editReply({
		flags: MessageFlags.IsComponentsV2,
		components: [ container ]
	})
}

export const getContainer = async (params: {
	slug: string,
	loaders: string[] | readonly string[],
	snapshots: boolean,
	users?: Collection<string, User>,
	roles?: Collection<string, Role | APIRole>
}, interaction: Interaction, guild?: Guild | null): Promise<ContainerBuilder> => {
	const lang = getLangFromInteraction(interaction)

	const users: Collection<string, User> | any[] = params.users || []
	const roles: Collection<string, Role | APIRole> | any[] = params.roles || []

	const { slug, snapshots } = params
	const loaders: string = getOpposites(params.loaders).join(', ')
	let mentionsArray: string[] = []
	for (const userArr of users) {
		const user = userArr[1]
		const userName: string = user.globalName || user.username

		mentionsArray.push(`[__**\`@${userName}\`**__](https://discord.com/users/${user.id})`)
	}

	if (guild)
		for (const roleArr of roles) {
			mentionsArray.push(`[__**\`@${roleArr[1].name}\`**__](https://discord.com/users/&${roleArr[1].id})`)
		}

	const containerText: string = translate("containers.addamod.verification", lang, {
		slug,
		loaders,
		bypassSnapshots: snapshots ? 'no' : 'yes',
		mentions: mentionsArray.join(', ') || 'nothing'
	})

	const containerTextDisplay = wrapInTextDisplay(containerText)

	const continueButton = getButton('addamod_continue', interaction)
	const cancelButton = getButton('addamod_cancel', interaction)

	const buttonActionrow = wrapInRow(
		cancelButton,
		continueButton
	)

	const container = new ContainerBuilder()
		.addTextDisplayComponents(containerTextDisplay)
		.addActionRowComponents(buttonActionrow)

	return container
}

export const verifyText = (text: string): string[] => {
	let match: string[] | null
	do {
		match = text.match(/^> Mod slug: ([\w!@\$\(\)`.+,"\-']+)\n> Selected loaders: ([A-Za-z, ]+)\n> Bypass snapshots: (yes|no)$/)
		if (match) break
		match = text.match(/^> Slug du mod : ([\w!@\$\(\)`.+,"\-']+)\n> Lanceurs de mods sélectionnés : ([A-Za-z, ]+)\n> Passer outre les snapshots : (yes|no)$/)
		if (match) break
		throw new Error('Wrong text')
	} while (0)
	return match
}