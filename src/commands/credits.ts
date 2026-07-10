import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	MessageFlags,
	SeparatorBuilder,
	SeparatorSpacingSize,
	ContainerBuilder
} from "discord.js"

import {
	EMOJIS,
	LINKS
} from "../constants"

import {
	embedPings,
	wrapInTextDisplay
} from "../utils"

export const data = new SlashCommandBuilder()
	.setName('credits')
	.setDescription('Vew the credits')
	.setContexts(0, 1, 2)
	.setIntegrationTypes(0, 1)

export const execute = async (interaction: ChatInputCommandInteraction): Promise<any> => {
	await interaction.deferReply()
	const data = {
		contributors: [
			{
				name: 'Marax 🇨🇭',
				id: '1313829582066941976'
			},
		],
		graphists: [
			{
				name: 'Marax 🇨🇭',
				id: '1313829582066941976'
			},
		],
		testers: [
			{
				name: 'Marax 🇨🇭',
				id: '1313829582066941976'
			},
			{
				name: 'Spectra',
				id: '1043860463903051846'
			},
			{
				name: 'Maxlware',
				id: '1440682277599445125'
			},
		],
		moderators: [
			{
				name: 'Marax 🇨🇭',
				id: '1313829582066941976'
			},
			{
				name: 'Spectra',
				id: '1043860463903051846'
			},
			{
				name: 'Maxlware',
				id: '1440682277599445125'
			},
			{
				name: 'Yozora',
				id: '1259896551761907713'
			},
			{
				name: 'Izac ≠ Dev',
				id: '1360279993229508902'
			},
		],
		guild_managers: [
			{
				name: 'Marax 🇨🇭',
				id: '1313829582066941976'
			},
			{
				name: 'Spectra',
				id: '1043860463903051846'
			},
			{
				name: 'Maxlware',
				id: '1440682277599445125'
			},
		],
	}

	const texts = [
		`# ${EMOJIS.MMUN} Credits\n## ${EMOJIS.DISC_BOT} [Discord Bot](${LINKS.BOT_OAUTH})\n### Development/Contributors\n${embedPings(data.contributors)}`,
		`### Graphism\n${embedPings(data.graphists)}`,
		`### Testers/Bug reporters\n${embedPings(data.testers)}`,
		`## ${EMOJIS.DISC_COMMUNITY} [Discord Guild](${LINKS.DISCORD_GUILD_CREDITS})\n### Moderators\n${embedPings(data.moderators)}`,
		`### Guild managers\n${embedPings(data.guild_managers)}`,
	]
	const textDisplays = texts.map(m => wrapInTextDisplay(m))
	const separators = [
		new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small),
		new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
	]

	const container = new ContainerBuilder()
		.addTextDisplayComponents(textDisplays[0])
		.addSeparatorComponents(separators[0])
		.addTextDisplayComponents(textDisplays[1])
		.addSeparatorComponents(separators[0])
		.addTextDisplayComponents(textDisplays[2])
		.addSeparatorComponents(separators[1])
		.addTextDisplayComponents(textDisplays[3])
		.addSeparatorComponents(separators[0])
		.addTextDisplayComponents(textDisplays[4])

	return await interaction.editReply({
		flags: MessageFlags.IsComponentsV2,
		components: [ container ]
	})
}