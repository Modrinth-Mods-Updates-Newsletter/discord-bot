import type { ReadonlyRecord } from "./utils/types"

/**
 * Some lang entries
 */
export const LANG: ReadonlyRecord<string, string> = {
	/**
	 * Default language: English
	 */
	DEFAULT: 'en',
	/**
	 * English
	 */
	EN: 'en',
	/**
	 * French; Français
	 */
	FR: 'fr'
}

/**
 * Some GIF links
 */
export const GIFS: ReadonlyRecord<string, Array<string>> = {
	PONG: [
		"https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/8a/d6/4amntfik.gif", // https://klipy.com/gifs/playing-table-tennis-mao-jingdian
		"https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/54/cf/qEoabOFo.gif", // https://klipy.com/gifs/pong-1
		"https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/82/07/qkmQXuax.gif"  // https://klipy.com/gifs/ping-pong-9
	]
}

export const REGEX: ReadonlyRecord<string, RegExp> = {
	/**
	 * The regex of a Modrinth slug
	 */
	MODRINTH_PROJECT_ID: /^[\w!@\$\(\)`.+,"\-']{3,64}$/
}

/**
 * Some of these emojis are hosted in a custom Discord guild; replace the emojis with a \@replace tag with yours
 */
export const EMOJIS: ReadonlyRecord<string, string> = {
	/**
	 * Green circle with a green check
	 * @replace
	 */
	TRUE: "<:true:1526585517733445753>",
	/**
	 * Red circle with a cross
	 * @replace
	 */
	FALSE: "<:false:1526585560427266099>",
	/**
	 * Orange circle with an orange filled circle
	 * @replace
	 */
	ON: "<:on:1526585711036334200>",
	/**
	 * Gray circle with a small gray filled circle
	 * @replace
	 */
	OFF: "<:off:1526585757169352885>",
	/**
	 * Green branch
	 * @replace
	 */
	TRUE_JOIN: "<:true_join:1526585821074030723>",
	/**
	 * Green end of branch
	 * @replace
	 */
	TRUE_JOIN_END: "<:true_join_end:1526586130735169730>",
	/**
	 * Red branch
	 * @replace
	 */
	FALSE_JOIN: "<:false_join:1526585874551406643>",
	/**
	 * Red end of branch
	 * @replace
	 */
	FALSE_JOIN_END: "<:false_join_end:1526586179187904573>",
	/**
	 * Orange branch
	 * @replace
	 */
	ON_JOIN: "<:on_join:1526585947532038215>",
	/**
	 * Orange end of branch
	 * @replace
	 */
	ON_JOIN_END: "<:on_join_end:1526586225647948017>",
	/**
	 * Gray branch
	 * @replace
	 */
	OFF_JOIN: "<:off_join:1526586008844501084>",
	/**
	 * Gray end of branch
	 * @replace
	 */
	OFF_JOIN_END: "<:off_join_end:1526586265758204056>",
	/**
	 * Three dots spawning and despawning
	 * @replace
	 */
	_3DOTS: "<a:3dots:1526586411682107392>",
	/**
	 * Fabric Modrinth's icon
	 * @replace
	 */
	FABRIC_ICON: "<:fabric_icon:1526585363316080650>",
	/**
	 * Quilt Modrinth's icon
	 * @replace
	 */
	QUILT_ICON: "<:quilt_icon:1526585320177406126>",
	/**
	 * Forge Modrinth's icon
	 * @replace
	 */
	FORGE_ICON: "<:forge_icon:1526585245829169183>",
	/**
	 * NeoForge Modrinth's icon
	 * @replace
	 */
	NEOFORGE_ICON: "<:neoforge_icon:1526585198702235708>",
	/**
	 * PaperMC Modrinth's icon
	 * @replace
	 */
	PAPERMC_ICON: "<:papermc_icon:1526585069379125391>",
	/**
	 * Purpur Modrinth's icon
	 * @replace
	 */
	PURPUR_ICON: "<:purpur_icon:1526585018158415902>",
	/**
	 * Spigot Modrinth's icon
	 * @replace
	 */
	SPIGOT_ICON: "<:spigot_icon:1526584970498412624>",
	/**
	 * Folia Modrinth's icon
	 * @replace
	 */
	FOLIA_ICON: "<:folia_icon:1526584900973760626>",
	/**
	 * Bukkit Modrinth's icon
	 * @replace
	 */
	BUKKIT_ICON: "<:bukkit_icon:1526584834929983508>",
	/**
	 * Datapack Modrinth's icon
	 * @replace
	 */
	DATAPACK_ICON: "<:datapack_icon:1530501838577602695>",
	/**
	 * MMUN's icon
	 * @replace
	 */
	MMUN: '<:mmun:1526586553692852235>',
	/**
	 * Discord's icon
	 * @replace
	 */
	DISCORD: '<:discord:1526586651915059210>',
	/**
	 * A blue bot
	 * The icon can also be used in Discord by [joining the Discord guild]({@link https://discord.gg/5KDYQ5uF7H})
	 * @replace
	 */
	DISC_BOT: '<:disc_bot:1524100920877514814>',
	/**
	 * Discord's community icon
	 * The icon can also be used in Discord by [joining the Discord guild]({@link https://discord.gg/5KDYQ5uF7H})
	 * @replace
	 */
	DISC_COMMUNITY: '<:disc_community:1524100869660999802>'
}

/**
 * Idem; replace the links with a \@replace tag with yours
 */
export const LINKS: ReadonlyRecord<string, string | Record<string, string>> = {
	DISCORD_GUILD: {
		CREDITS: "https://discord.gg/WfF5mmUpX6",
		CONFIG: 'https://discord.gg/5KDYQ5uF7H'
	},
	OAUTH2: "https://ptb.discord.com/oauth2/authorize?client_id="+process.env.CLIENT_ID,
	/**
	 * @deprecated The old name for {@link LINKS.OAUTH2}
	 */
	BOT_OAUTH: "https://ptb.discord.com/oauth2/authorize?client_id="+process.env.CLIENT_ID,
	/**
	 * @replace
	 * @note This is not the final domain name
	 */
	WEBSITE: {
		ROOT: 'https://saddling-symphonic-consensus.ngrok-free.dev/',
		DOCUMENTATION: 'https://saddling-symphonic-consensus.ngrok-free.dev/docs/',
		PANEL: 'https://saddling-symphonic-consensus.ngrok-free.dev/panel/'
	},
	/**
	 * @replace
	 * @note This is not the final domain name
	 * @deprecated The old name for {@link LINKS.WEBSITE}
	 */
	BOT_WEBSITE: {
		ROOT: 'https://saddling-symphonic-consensus.ngrok-free.dev/',
		DOCUMENTATION: 'https://saddling-symphonic-consensus.ngrok-free.dev/docs/',
		PANEL: 'https://saddling-symphonic-consensus.ngrok-free.dev/panel/'
	}
}