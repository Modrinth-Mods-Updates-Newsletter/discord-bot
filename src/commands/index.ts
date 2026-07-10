import { REST } from 'discord.js'
import { token } from '../bot'

import * as ping from './ping'
import * as config from './config'
import * as credits from './credits'

export const commandModules: Record<string, any>[] = [
	ping,
	config,
	credits
]

export const getCommands = () => {
	return commandModules.map(c => c.data.toJSON())
}

export const getRest = () => {
	return new REST({ version: '10' }).setToken(token)
}