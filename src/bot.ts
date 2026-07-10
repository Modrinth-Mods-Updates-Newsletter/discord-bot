"use strict"

import dotenv from "dotenv"
dotenv.config({ quiet: true })

import {
	ActivityType,
	Client,
	Events,
	GatewayIntentBits,
	Routes,
	type Interaction,
	StringSelectMenuInteraction,
	MentionableSelectMenuInteraction,
	RoleSelectMenuInteraction,
	UserSelectMenuInteraction,
	ChannelSelectMenuInteraction,
	type AnySelectMenuInteraction
} from "discord.js"

import {
	commandModules,
	getCommands,
	getRest
} from "./commands"

import { LANG } from "./constants"
import { translate } from "./i18n"

import { JsonStore } from "./store/jsonStore"
import { SessionStorage } from "./store/sessionStorage"

import { handleModals } from "./modals"
import { handleMenus } from "./menus"
import { handleButtons } from "./buttons"

if (!process.env.DISCORD_TOKEN) {
	console.error('TOKEN is not set; cannot start bot')
	process.exit(1)
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	],
	presence: {
		status: 'idle',
		activities: [{ name: translate('presence.watching.text', LANG.DEFAULT), type: ActivityType.Watching }],
	}
})

export const token = process.env.DISCORD_TOKEN
export const clientId = process.env.DISCORD_CLIENT_ID

export const store = new JsonStore()
export const sessionStorage = new SessionStorage(client)

const registerCommands = async () => {
	if (!clientId) {
		console.warn('CLIENT_ID is not set; skipping command registration')
		return false
	}
	await getRest().put(Routes.applicationCommands(clientId), { body: getCommands() })
	console.log('Commands registered')
}

client.on(Events.ClientReady, () => {
	console.info(`Logged in as ${client?.user?.tag}!`)
})

client.on(Events.InteractionCreate, async (interaction: Interaction): Promise<boolean> => {
	if (interaction.isChatInputCommand()) {
		const mod = commandModules.find(m => m.data.name === interaction.commandName)
		if (mod?.execute) {
			await mod.execute(interaction, { store })
		}
		return true
	}

	return false
})

client.on(Events.InteractionCreate, async (interaction: Interaction): Promise<boolean> => {
	if (interaction.isModalSubmit()) {
		await handleModals(interaction)
		return true
	}
	return false
})

export const isASelectMenu = (interaction: Interaction): interaction is AnySelectMenuInteraction => {
	return interaction instanceof StringSelectMenuInteraction ||
		   interaction instanceof MentionableSelectMenuInteraction ||
		   interaction instanceof RoleSelectMenuInteraction ||
		   interaction instanceof UserSelectMenuInteraction ||
		   interaction instanceof ChannelSelectMenuInteraction
}

client.on(Events.InteractionCreate, async (interaction: Interaction): Promise<boolean> => {
	if (isASelectMenu(interaction)) {
		await handleMenus(interaction)
		return true
	}
	return false
})

client.on(Events.InteractionCreate, async (interaction: Interaction): Promise<boolean> => {
	if (interaction.isButton()) {
		await handleButtons(interaction)
		return true
	}
	return false
})

registerCommands().catch(console.error)
client.login(token)