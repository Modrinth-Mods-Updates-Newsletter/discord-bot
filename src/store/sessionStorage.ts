import type { Client } from "discord.js"

export class SessionStorage extends Map {
	constructor (client: Client) {
		super()
		this.set('client', client)
	}
}