"use strict"

import dotenv from "dotenv"

dotenv.config({ quiet: true })

import {
	ActivityType,
	Client,
	Events,
	GatewayIntentBits,
	type ModalSubmitInteraction,
	Routes,
	type Interaction
} from "discord.js"

import { LANG } from "./constants"
import { translate } from "./i18n"
import { JsonStore } from "./store/jsonStore"

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

import {
	commandModules,
	getCommands,
	getRest
} from "./commands"
import { handleModals } from "./modals"

export const store = new JsonStore(undefined, client)

const registerCommands = async () => {
	if (!clientId) {
		console.warn('CLIENT_ID is not set; skipping command registration')
		return false
	}
	await getRest().put(Routes.applicationCommands(clientId), { body: getCommands() })
	console.log('Commands registered')
}

client.on(Events.ClientReady, () => {
	console.log(`Logged in as ${client?.user?.tag}!`)
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

registerCommands().catch(console.error)
client.login(token)