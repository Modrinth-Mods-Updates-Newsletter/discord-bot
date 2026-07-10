import fs from 'fs'
import { REGEX } from '../constants'
import { readOnlyArr } from '../utils'

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

	registerMod (userId: string | null, guildId: string | null | undefined, slug: string, loaders: readonly string[] | string[], ignoreSnapshots: boolean): string {
		if (!REGEX.MODRINTH_PROJECT_ID.test(slug)) throw new Error("Bad slug")
		if (guildId) {
			this.data.guilds = this.data.guilds || {}
			this.data.guilds[guildId] = this.data.guilds[guildId] || {}
			this.data.guilds[guildId].mods = this.data.guilds[guildId].mods || {}
			this.data.guilds[guildId].mods[slug] = this.data.guilds[guildId].mods[slug] || {}
			this.data.guilds[guildId].mods[slug].loaders = readOnlyArr(loaders)
			this.data.guilds[guildId].mods[slug].ignoreSnapshots = ignoreSnapshots
		} else if (userId) {
			this.data.users = this.data.users || {}
			this.data.users[userId] = this.data.users[userId] || {}
			this.data.users[userId].mods = this.data.users[userId].mods || {}
			this.data.users[userId].mods[slug] = this.data.users[userId].mods[slug] || {}
			this.data.users[userId].mods[slug].loaders = readOnlyArr(loaders)
			this.data.users[userId].mods[slug].ignoreSnapshots = ignoreSnapshots
		} else {
			throw new Error('guildId & userId are undefined')
		}
		this.save()
		return slug
	}
}