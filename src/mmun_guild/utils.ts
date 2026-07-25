import type {
	Channel,
	GuildBasedChannel,
	Message
} from "discord.js"

import { GuildChannel } from "discord.js"
import constants from './constants'

export const verifyGuild = (message: Message): boolean => {
	return message.guildId === constants.GUILD_ID
}

export const verifyChannel = (message: Message, channel: string | Channel): boolean => {
	const channelId: string = typeof channel === 'string' ? channel : channel.id
	return message.channelId === channelId
}

export const isGuildChannel = (channel: Channel): channel is GuildBasedChannel => {
	return channel instanceof GuildChannel
}