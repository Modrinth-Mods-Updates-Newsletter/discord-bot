import {
	token,
	clientId
} from '../bot'

import {
	Client,
	Events
} from 'discord.js'

import { execute as messageCreateExecute } from './events/messagecreate'

export {
	token,
	clientId
}

export default (client: Client<boolean>) => {
	client.on(Events.MessageCreate, messageCreateExecute)
}