import type { Client } from "discord.js"

export class SessionStorage extends Map {
	constructor (client: Client) {
		super()
		this.set('client', client)
	}

	getClient () {
		return this.get('client')
	}

	getData () {
		return this.get('data')
	}

	getUserSessionStorage (userId: string) {
		return (this.getData() || new Map()).get(userId)
	}
}