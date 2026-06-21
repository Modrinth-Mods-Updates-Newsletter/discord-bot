import {
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	LabelBuilder,
	type StringSelectMenuBuilder,
	type ModalSubmitInteraction,
	CheckboxGroupBuilder,
	CheckboxGroupOptionBuilder
} from "discord.js"

import { translate } from "../i18n"
import { createStringSelectMenu } from "../utils"
import type { Data } from "."

export const execute = async (interaction: ModalSubmitInteraction): Promise<any> => {
	console.log(interaction.isModalSubmit())
}

export const getData = (lang: string): Data => {
	const modal = new ModalBuilder()
		.setCustomId('addamod')
		.setTitle(translate("modals.addamod.title", lang))

	const modIdInput = new TextInputBuilder()
		.setCustomId('modId')
		.setStyle(TextInputStyle.Short)
		.setPlaceholder(translate("modals.addamod.modId.placeholder", lang))
		.setRequired(true)

	const modIdLabel = new LabelBuilder()
		.setLabel(translate("modals.addamod.modId.label", lang))
		.setDescription(translate("modals.addamod.modId.description", lang))
		.setTextInputComponent(modIdInput)

	const modLoadersSelect: StringSelectMenuBuilder = createStringSelectMenu([
			{
				label: "Fabric",
				description: translate("modals.addamod.modLoaders.fabric", lang),
				value: "fabric",
				emoji: '1517475209139978363'
			},
			{
				label: "Quilt",
				description: translate("modals.addamod.modLoaders.quilt", lang),
				value: "quilt",
				emoji: '1517476031286607945'
			},
			{
				label: "Forge",
				description: translate("modals.addamod.modLoaders.forge", lang),
				value: "forge",
				emoji: '1517476878242287626'
			},
			{
				label: "NeoForge",
				description: translate("modals.addamod.modLoaders.neoforge", lang),
				value: "neoforge",
				emoji: '1517496107587080233'
			},
			{
				label: "PaperMC",
				description: translate("modals.addamod.modLoaders.papermc", lang),
				value: "papermc",
				emoji: '1517497490054578177'
			},
			{
				label: "Purpur",
				description: translate("modals.addamod.modLoaders.purpur", lang),
				value: "purpur",
				emoji: '1517498713738707106'
			},
			{
				label: "Spigot",
				description: translate("modals.addamod.modLoaders.spigot", lang),
				value: "spigot",
				emoji: '1517498983248035993'
			},
			{
				label: "Folia",
				description: translate("modals.addamod.modLoaders.folia", lang),
				value: "folia",
				emoji: '1517499610900332607'
			},
			{
				label: "Bukkit",
				description: translate("modals.addamod.modLoaders.bukkit", lang),
				value: "bukkit",
				emoji: '1517499608798859425'
			}
		])
	
	modLoadersSelect
		.setCustomId('modLoader')
		.setPlaceholder(translate("modals.addamod.modLoaders.placeholder", lang))
		.setMinValues(1)
		.setMaxValues(modLoadersSelect.options.length)

	const modLoadersLabel = new LabelBuilder()
		.setLabel(translate("modals.addamod.modLoaders.label", lang))
		.setDescription(translate("modals.addamod.modLoaders.description", lang))
		.setStringSelectMenuComponent(modLoadersSelect)

	const mentionCheckbox = new CheckboxGroupOptionBuilder()
		.setLabel('Be mentioned')
		.setValue('mention')
		.setDefault(true)

	const snapshotsCheckbox = new CheckboxGroupOptionBuilder()
		.setLabel('See snapshots updates')
		.setDescription('Mods are rarely making snapshots updates')
		.setValue('snapshots')

	const otherCheckboxGroup = new CheckboxGroupBuilder()
		.setCustomId('other')
		.setRequired(false)
		.addOptions(
			mentionCheckbox,
			snapshotsCheckbox
		)
	
	const othersLabel = new LabelBuilder()
		.setLabel('Other')
		.setCheckboxGroupComponent(otherCheckboxGroup)

	modal.addLabelComponents(
		modIdLabel,
		modLoadersLabel,
		othersLabel
	)

	return {
		id: modal.data.custom_id || "",
		modal,
		execute
	}
}