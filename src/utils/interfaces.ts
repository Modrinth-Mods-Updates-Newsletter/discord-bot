import type {
	Interaction
} from "discord.js"

/**
 * Component data using a builder and an execute
 */
export interface Data<B, E = (interaction: Interaction) => {}> {
	component: B,
	execute: E
}

/**
 * Component data using a builder, an execute and an id
 * @see {@link Data}
 */
export interface DataId<B, E = (interaction: Interaction) => {}> extends Data<B, E> {
	id: string
}