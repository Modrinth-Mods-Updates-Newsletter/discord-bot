import fs from 'fs'
import { REGEX } from '../constants'

export class JsonStore {
	private path: string
	private data: {
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

	constructor (path: string = 'data.json') {
		this.path = path

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
		if (!REGEX.MODRINTH_PROJECT_ID.test(modId)) throw new Error("Bad slug")
		if (guildId) {
			this.data.guilds[guildId] = this.data.guilds[guildId] || {}
			this.data.guilds[guildId].mods[modId]
		}
	}
}