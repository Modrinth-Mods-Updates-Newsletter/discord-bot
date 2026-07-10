import type {
	Interaction
} from "discord.js"

export interface Data<B, E = (interaction: Interaction) => {}> {
	component: B,
	execute: E
}

export interface DataId<B, E> extends Data<B, E> {
	id: string
}