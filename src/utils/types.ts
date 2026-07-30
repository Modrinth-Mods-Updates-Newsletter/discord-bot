import type {
	Channel,
	ChannelSelectMenuBuilder,
	MentionableSelectMenuBuilder,
	RoleSelectMenuBuilder,
	StringSelectMenuBuilder,
	UserSelectMenuBuilder
} from "discord.js"

/**
 * Any select menu builder
 */
export type AnySelectMenuBuilder =
	StringSelectMenuBuilder |
	ChannelSelectMenuBuilder |
	RoleSelectMenuBuilder |
	UserSelectMenuBuilder |
	MentionableSelectMenuBuilder

/**
 * Any select menu builder
 * @deprecated Old name for {@link AnySelectMenuBuilder}
 */
export type SelectMenuBuilder =
	StringSelectMenuBuilder |
	ChannelSelectMenuBuilder |
	RoleSelectMenuBuilder |
	UserSelectMenuBuilder |
	MentionableSelectMenuBuilder

export type Executable<I> = (interaction: I) => Promise<any>
export type ChannelIdOrChannel = Channel | string
export type ReadonlyRecord<K extends keyof any, T> = Readonly<Record<K, T>>