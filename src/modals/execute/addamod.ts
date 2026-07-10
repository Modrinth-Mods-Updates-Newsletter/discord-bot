import {
	ContainerBuilder,
	Message,
	MessageFlags,
	TextDisplayBuilder,
	type ModalSubmitInteraction
} from "discord.js"

import {
	EMOJIS,
	REGEX
} from "../../constants"

import {
	getLangFromInteraction,
	translate
} from "../../i18n"

import { fetchModrinthAPI } from "../../apis/modrinth"
import { wrapInRow } from "../../utils"
import { getSelect } from "../../menus"
import { getOpposites } from "../../utils/dictionnary"
import { getButton } from "../../buttons"
import { getContainer as getFinalContainer } from '../../menus/execute/addamod'
import { store } from "../../bot"

export const execute = async (interaction: ModalSubmitInteraction): Promise<boolean> => {
	await interaction.deferReply()
	const lang: string = getLangFromInteraction(interaction)

	const modId: string = interaction.fields.getTextInputValue('modId')
	const modLoaders: readonly string[] = interaction.fields.getStringSelectValues('modLoader')
	const misc: readonly string[] = interaction.fields.getCheckboxGroup('misc')
	const notified: boolean = misc.includes('mention')
	const snapshots: boolean = misc.includes('snapshots')

	const isModIdRegexCorrect: boolean = REGEX.MODRINTH_PROJECT_ID.test(modId)
	let textDisplay = new TextDisplayBuilder()
		.setContent(translate("containers.addamod.verifMod.textDisplays.0", lang, {
			beginning: "",
			"3dots": EMOJIS._3DOTS
		}))
	let container: ContainerBuilder = getContainer(0, lang, { isModIdRegexCorrect })

	const editReply = async (bool: boolean | undefined, errMessage: string, bypass?: boolean): Promise<Message<boolean>> => {
		const textDisplay2 = new TextDisplayBuilder().setContent(`> ${errMessage}`)

		return await interaction.editReply({
			flags: MessageFlags.IsComponentsV2,
			components: bool || bypass ? [textDisplay, bool ? container : container.addTextDisplayComponents(textDisplay2)] : [container.addTextDisplayComponents(textDisplay2)]
		}).catch()
	}

	await editReply(isModIdRegexCorrect, translate("containers.addamod.verifMod.errs.slug", lang))

	if (!isModIdRegexCorrect) return false

	const modDetails = await fetchModrinthAPI(modId)
	const {
		doesModExist,
		modName
	} = modDetails

	container = getContainer(1, lang, { doesModExist })
	textDisplay.setContent(translate("containers.addamod.verifMod.textDisplays.1", lang, {
		beginning: `${modName}: `,
		"3dots": EMOJIS._3DOTS
	}))
	await editReply(doesModExist, "Your mod slug is not correct.")
	if (!doesModExist) return false

	const { loaders } = modDetails || {}

	const areLoadersCorrect: boolean = modLoaders?.every(modLoader => loaders?.includes(modLoader))

	container = getContainer(2, lang, { areLoadersCorrect })
	textDisplay.setContent(translate("containers.addamod.verifMod.textDisplays.2", lang, {
		beginning: (modName || ''),
		"3dots": ''
	}))

	await editReply(areLoadersCorrect, translate("containers.addamod.verifMod.errs.loaders", lang), true)

	if (!areLoadersCorrect) return false

	const params = {
		modSlug: modId,
		modLoaders,
		snapshots
	}

	const textDisplay1 = textDisplay
	const container1 = container

	await (async () => {
		if (notified) {
			const selectMenu = getSelect(interaction, 'mention_select', params)
			const skipButton = getButton('addamod_skip', interaction)

			const actionRowselect = wrapInRow(selectMenu)

			const actionRowButton = wrapInRow(skipButton)

			const detailsTextDisplay = new TextDisplayBuilder().setContent(translate("containers.addamod.path", lang, {
				slug: modId,
				loaders: getOpposites(modLoaders).join(', '),
				bypassSnapshots: snapshots ? "no" : "yes"
			}))

			const textDisplay = new TextDisplayBuilder().setContent(translate("containers.addamod.mentions.text", lang))
			const interactionContainer = new ContainerBuilder()
				.addTextDisplayComponents(textDisplay)
				.addActionRowComponents(actionRowselect)
				.addActionRowComponents(actionRowButton)

			const detailsContainer = new ContainerBuilder().addTextDisplayComponents(detailsTextDisplay)

			await interaction.editReply({
				flags: MessageFlags.IsComponentsV2,
				components: [
					textDisplay1,
					container1,
					detailsContainer,
					interactionContainer
				]
			}).catch()

			return true
		} else {
			store.registerMod(interaction.user.id, interaction.guild?.id, modId, modLoaders, !snapshots)
			
			const container = await getFinalContainer({
				slug: modId,
				loaders: modLoaders,
				snapshots
			}, interaction)
			await interaction.editReply({
				flags: MessageFlags.IsComponentsV2,
				components: [ container ]
			})

			return true
		}
	})()

	return true
}

export const getContainer = (step: number, lang: string, {
	isModIdRegexCorrect,
	doesModExist,
	areLoadersCorrect
}: {
	isModIdRegexCorrect?: boolean,
	doesModExist?: boolean,
	areLoadersCorrect?: boolean
}): ContainerBuilder => {
	const bool: boolean = [ isModIdRegexCorrect, doesModExist, areLoadersCorrect ][step] || false

	return new ContainerBuilder()
		.addTextDisplayComponents(
			new TextDisplayBuilder()
				.setContent(
					translate(
						"containers.addamod.verifMod.containerText",
						lang,
						[
							bool ? {
								"0largeEmoji": EMOJIS.ON,
								"0joinEmoji1": EMOJIS.ON_JOIN,
								"0joinEmojiEnd": EMOJIS.OFF_JOIN_END,
								"1largeEmoji": EMOJIS.OFF,
								"1joinEmojiEnd": EMOJIS.OFF_JOIN_END
							} : {
								"0largeEmoji": EMOJIS.FALSE,
								"0joinEmoji1": EMOJIS.FALSE_JOIN,
								"0joinEmojiEnd": EMOJIS.OFF_JOIN_END,
								"1largeEmoji": EMOJIS.OFF,
								"1joinEmojiEnd": EMOJIS.OFF_JOIN_END
							},
							bool ? {
								"0largeEmoji": EMOJIS.TRUE,
								"0joinEmoji1": EMOJIS.TRUE_JOIN,
								"0joinEmojiEnd": EMOJIS.TRUE_JOIN_END,
								"1largeEmoji": EMOJIS.ON,
								"1joinEmojiEnd": EMOJIS.OFF_JOIN_END
							} : {
								"0largeEmoji": EMOJIS.FALSE,
								"0joinEmoji1": EMOJIS.TRUE_JOIN,
								"0joinEmojiEnd": EMOJIS.FALSE_JOIN_END,
								"1largeEmoji": EMOJIS.OFF,
								"1joinEmojiEnd": EMOJIS.OFF_JOIN_END
							},
							bool ? {
								"0largeEmoji": EMOJIS.TRUE,
								"0joinEmoji1": EMOJIS.TRUE_JOIN,
								"0joinEmojiEnd": EMOJIS.TRUE_JOIN_END,
								"1largeEmoji": EMOJIS.TRUE,
								"1joinEmojiEnd": EMOJIS.TRUE_JOIN_END
							} : {
								"0largeEmoji": EMOJIS.TRUE,
								"0joinEmoji1": EMOJIS.TRUE_JOIN,
								"0joinEmojiEnd": EMOJIS.TRUE_JOIN_END,
								"1largeEmoji": EMOJIS.FALSE,
								"1joinEmojiEnd": EMOJIS.FALSE_JOIN_END
							}
						][step]
					)
				)
		)
}