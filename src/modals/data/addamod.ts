import {
	CheckboxGroupBuilder,
	CheckboxGroupOptionBuilder,
	LabelBuilder,
	ModalBuilder,
	StringSelectMenuBuilder,
	TextInputBuilder,
	TextInputStyle
} from "discord.js"

import type {
	DataId
} from "../../utils/interfaces"

import { execute } from "../execute/addamod"
import { translate } from "../../i18n"
import { createStringSelectMenu } from "../../utils"
import { EMOJIS } from "../../constants"
import type { ModalExecutable } from ".."

export const getData = (lang: string): DataId<ModalBuilder, ModalExecutable> => {
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
				label: "Datapack",
				description: translate("modals.addamod.modLoaders.datapack", lang),
				value: "datapack",
				emoji: EMOJIS.DATAPACK_ICON
			},
			{
				label: "Fabric",
				description: translate("modals.addamod.modLoaders.fabric", lang),
				value: "fabric",
				emoji: EMOJIS.FABRIC_ICON
			},
			{
				label: "Quilt",
				description: translate("modals.addamod.modLoaders.quilt", lang),
				value: "quilt",
				emoji: EMOJIS.QUILT_ICON
			},
			{
				label: "Forge",
				description: translate("modals.addamod.modLoaders.forge", lang),
				value: "forge",
				emoji: EMOJIS.FORGE_ICON
			},
			{
				label: "NeoForge",
				description: translate("modals.addamod.modLoaders.neoforge", lang),
				value: "neoforge",
				emoji: EMOJIS.NEOFORGE_ICON
			},
			{
				label: "Paper",
				description: translate("modals.addamod.modLoaders.papermc", lang),
				value: "paper",
				emoji: EMOJIS.PAPERMC_ICON
			},
			{
				label: "Purpur",
				description: translate("modals.addamod.modLoaders.purpur", lang),
				value: "purpur",
				emoji: EMOJIS.PURPUR_ICON
			},
			{
				label: "Spigot",
				description: translate("modals.addamod.modLoaders.spigot", lang),
				value: "spigot",
				emoji: EMOJIS.SPIGOT_ICON
			},
			{
				label: "Folia",
				description: translate("modals.addamod.modLoaders.folia", lang),
				value: "folia",
				emoji: EMOJIS.FOLIA_ICON
			},
			{
				label: "Bukkit",
				description: translate("modals.addamod.modLoaders.bukkit", lang),
				value: "bukkit",
				emoji: EMOJIS.BUKKIT_ICON
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
		.setLabel(translate('modals.addamod.misc.ping', lang))
		.setValue('mention')
		.setDefault(true)

	const snapshotsCheckbox = new CheckboxGroupOptionBuilder()
		.setLabel(translate('modals.addamod.misc.snapshots', lang))
		.setDescription('Mods are rarely making snapshots updates')
		.setValue('snapshots')

	const miscCheckboxGroup = new CheckboxGroupBuilder()
		.setCustomId('misc')
		.setRequired(false)
		.addOptions(
			mentionCheckbox,
			snapshotsCheckbox
		)
	
	const miscLabel = new LabelBuilder()
		.setLabel('Misc')
		.setCheckboxGroupComponent(miscCheckboxGroup)

	modal.addLabelComponents(
		modIdLabel,
		modLoadersLabel,
		miscLabel
	)

	return {
		id: modal.data.custom_id || "",
		component: modal,
		execute
	}
}