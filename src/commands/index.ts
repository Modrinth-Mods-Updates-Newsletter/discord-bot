import { REST } from 'discord.js'
import { token } from '../bot'

import * as ping from './ping'
import * as config from './config'
import * as credits from './credits'

/**
 * Data & executables for Discord commands
 */
export const commandModules: Record<string, any>[] = [
	ping,
	config,
	credits
]

/**
 * Get commmands data
 * @returns Commands data
 */
export const getCommands = (): Record<string, any>[] => commandModules.map(c => c.data.toJSON())
/**
 * Get Discord's REST
 * @returns Discord's REST
 * @see {@link REST}
 */
export const getRest = () => new REST({ version: '10' }).setToken(token)