import type {
	Channel,
	ChannelSelectMenuBuilder,
	MentionableSelectMenuBuilder,
	RoleSelectMenuBuilder,
	StringSelectMenuBuilder,
	UserSelectMenuBuilder
} from "discord.js"

export type SelectMenuBuilder =
StringSelectMenuBuilder |
ChannelSelectMenuBuilder |
RoleSelectMenuBuilder |
UserSelectMenuBuilder |
MentionableSelectMenuBuilder
export type Executable<I> = (interaction: I) => Promise<any>

export type ChannelIdOrChannel = Channel | string