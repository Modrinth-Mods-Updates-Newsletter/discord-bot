import {
	isGuildChannel,
	verifyGuild
} from "../utils"

import {
	ChannelType,
	type GuildBasedChannel,
	type Message
} from "discord.js"	

import type { ChannelIdOrChannel } from "../../utils/types"
import { getOpposite } from "../../utils/dictionnary"
import { CHANNELS } from "../constants"

export const execute = async (message: Message): Promise<void> => {
	sendMessageAsAGuild(message, CHANNELS.BOTS_UPDATES)

	// Add many more channels here and in the dictionnary
}

export const sendMessageAsAGuild = async (message: Message, channel: ChannelIdOrChannel): Promise<boolean> => {
	if (!message.guild) return true
	
	const channel2: GuildBasedChannel | null = typeof channel === 'string' ? await message.guild.channels.fetch(channel) : channel
	if (!channel2) throw new Error("Channel not found")
	const channel1 = message.channel
	const isChannel1AnnouncementChannel: boolean = channel2.type === ChannelType.GuildAnnouncement

	switch (true) {
		case message.author.bot:
		case !verifyGuild(message):
		case channel2.id !== getOpposite(message.channelId):
			return true
	}

	if (!isGuildChannel(channel1)) throw new Error("Channel isn't a part of a guild")
	if (!message.crosspostable) throw new Error("Not an announcement channel or bot doesn't have permissions")

	await channel2.edit({
		type: ChannelType.GuildText
	})
	const announcementMessage: Message<true> = await channel1.send({
		components: message.components,
		flags: message.flags,
		content: message.content,
		embeds: message.embeds
	})
	await message.delete().catch(console.error)
	await announcementMessage.crosspost()
	setTimeout(async () => {
		if (isChannel1AnnouncementChannel)
			await channel2.edit({
				type: ChannelType.GuildAnnouncement
			})
		await announcementMessage.reply(`Sent by <@${message.author.id}>`)
	}, 5000)

	return true
}