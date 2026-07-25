import {
	ChannelType,
	type GuildBasedChannel,
	type Message
} from "discord.js"

import {
	isGuildChannel,
	verifyChannel,
	verifyGuild
} from "../utils"
import { CHANNELS } from "../constants"

export const execute = async (message: Message): Promise<boolean> => {
	if (message.author.bot) return true
	if (!message.guild) return true
	if (!verifyGuild(message)) return true
	if (!verifyChannel(message, CHANNELS.BOTS_UPDATES_SEND_HERE)) return true
	
	const botsUpdatesChannel: GuildBasedChannel | null = await message.guild.channels.fetch(CHANNELS.BOTS_UPDATES)
	const botsUpdatesSendHereChannel = message.channel

	if (!isGuildChannel(botsUpdatesSendHereChannel)) throw new Error("Channel isn't a part of a guild")
	if (!botsUpdatesChannel) throw new Error("Bot's updates channel not found")
	if (!message.crosspostable) throw new Error("Not an announcement channel or bot doesn't have permissions")

	await botsUpdatesChannel.edit({
		type: ChannelType.GuildText
	})
	const announcementMessage: Message<true> = await botsUpdatesSendHereChannel.send({
		components: message.components,
		flags: message.flags,
		content: message.content,
		embeds: message.embeds
	})
	await message.delete().catch(console.error)
	await announcementMessage.crosspost()
	setTimeout(async () => {
		await botsUpdatesChannel.edit({
			type: ChannelType.GuildAnnouncement
		})
	}, 5000)

	return true
}