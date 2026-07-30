import type {
	Channel,
	GuildBasedChannel,
	Message
} from "discord.js"

import { GuildChannel } from "discord.js"
import CONSTANTS from './constants'

/**
 * Verify if the guild id is right
 * @param message Message
 * @returns Is the guild id right
 */
export const verifyGuild = (message: Message): boolean => {
	return message.guildId === CONSTANTS.GUILD_ID
}

/**
 * Verify if the channel id is right
 * @param message Message
 * @param channel Channel or a channel id
 * @returns Is the channel id right
 */
export const verifyChannel = (message: Message, channel: string | Channel): boolean => {
	const channelId: string = typeof channel === 'string' ? channel : channel.id
	return message.channelId === channelId
}

/**
 * Verify if the channel is a part of a guild
 * @param channel Channel
 * @returns Is the channel a part of a guild
 */
export const isGuildChannel = (channel: Channel): channel is GuildBasedChannel => {
	return channel instanceof GuildChannel
}