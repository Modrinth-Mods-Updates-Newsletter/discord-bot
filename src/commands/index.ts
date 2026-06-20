import { REST } from 'discord.js'
import * as ping from './ping'
import * as config from './config'
import { token } from '../bot'

export const commandModules: Record<string, any>[] = [
	ping,
	config
]

export const getCommands = () => {
	return commandModules.map(c => c.data.toJSON())
}

export const getRest = () => {
	return new REST({ version: '10' }).setToken(token)
}