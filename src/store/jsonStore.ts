import fs from 'fs'
import { PATHS } from '../constants';
import type { Client } from 'discord.js';

export class JsonStore {
	path: string
	client: Client
	data: {
		guilds: Record<string, {
			channelId: string,
			mods: Record<string, {
				loaders: string[],
				ignoreSnapshots: boolean
			}>
		}>,
		users: Record<string, {
			mods: Record<string, {
				loaders: string[],
				ignoreSnapshots: boolean
			}>
		}>
	}

	constructor (path: string = PATHS.STORE_FILE, client: Client) {
		this.path = path
		this.client = client

		if (!fs.existsSync(this.path)) {
			fs.writeFileSync(this.path, "{}")
		}

		this.data = JSON.parse(fs.readFileSync(this.path, 'utf-8') || '{}')
	}

	save () {
		fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2))
	}

	setPingChannel (guildId: string, channelId: string) {
		this.data.guilds[guildId] = this.data.guilds[guildId] || {}
		return this.data.guilds[guildId].channelId = channelId
	}

	registerMod (userId: string | null, guildId: string | null, modId: string, loaders: string[], ignoreSnapshots: boolean) {
		if (!/^([\w-]+)$/.test(modId)) return
		console.log(modId)
		if (guildId) {
			this.data.guilds[guildId] = this.data.guilds[guildId] || {}
			this.data.guilds[guildId].mods[modId]
		}
	}
}