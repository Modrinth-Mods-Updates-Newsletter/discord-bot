import dotenv from "dotenv"
dotenv.config({ quiet: true })

import {
	ActivityType,
	Client,
	Events,
	Routes,
	type Interaction,
	GatewayIntentBits
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
import MMUNGuildExecute from './mmun_guild'
import { isASelectMenu } from "./utils"

if (!process.env.DISCORD_TOKEN) {
	console.error('TOKEN is not set; cannot start bot')
	process.exit(1)
}

/**
 * Bot's client
 */
export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
	presence: {
		status: 'idle',
		activities: [{ name: translate('presence.watching.text', LANG.DEFAULT), type: ActivityType.Watching }],
	}
})

/**
 * Bot's authorization token
 */
export const token = process.env.DISCORD_TOKEN
/**
 * Bot's client id
 */
export const clientId = process.env.DISCORD_CLIENT_ID

/**
 * Local storage
 */
export const store = new JsonStore()
/**
 * Session storage
 */
export const sessionStorage = new SessionStorage(client)



const registerCommands = async (): Promise<void | false> => {
	if (!clientId) {
		console.warn('CLIENT_ID is not set; skipping command registration')
		return false
	}
	await getRest().put(Routes.applicationCommands(clientId), { body: getCommands() })
	console.info('Commands registered')
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


/**
 * @todo Create a function with switch/case to handle the three interactions into one interaction
 */

client.on(Events.InteractionCreate, async (interaction: Interaction): Promise<boolean> => {
	if (interaction.isModalSubmit()) {
		await handleModals(interaction)
		return true
	}
	return false
})

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

MMUNGuildExecute(client)
registerCommands().catch(console.error)
client.login(token)