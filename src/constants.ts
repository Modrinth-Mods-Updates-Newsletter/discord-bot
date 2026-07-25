export const LANG = {
	DEFAULT: 'en',
	EN: 'en',
	FR: 'fr'
}

export const GIFS = {
	PONG: [
		"https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/8a/d6/4amntfik.gif", // https://klipy.com/gifs/playing-table-tennis-mao-jingdian
		"https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/54/cf/qEoabOFo.gif", // https://klipy.com/gifs/pong-1
		"https://static.klipy.com/ii/d7aec6f6f171607374b2065c836f92f4/82/07/qkmQXuax.gif"  // https://klipy.com/gifs/ping-pong-9
	]
}

export const REGEX = {
	MODRINTH_PROJECT_ID: /^[\w!@\$\(\)`.+,"\-']{3,64}$/
}

export const EMOJIS = { // Replace with yours
	TRUE: "<:true:1526585517733445753>",
	FALSE: "<:false:1526585560427266099>",
	ON: "<:on:1526585711036334200>",
	OFF: "<:off:1526585757169352885>",
	TRUE_JOIN: "<:true_join:1526585821074030723>",
	TRUE_JOIN_END: "<:true_join_end:1526586130735169730>",
	FALSE_JOIN: "<:false_join:1526585874551406643>",
	FALSE_JOIN_END: "<:false_join_end:1526586179187904573>",
	ON_JOIN: "<:on_join:1526585947532038215>",
	ON_JOIN_END: "<:on_join_end:1526586225647948017>",
	OFF_JOIN: "<:off_join:1526586008844501084>",
	OFF_JOIN_END: "<:off_join_end:1526586265758204056>",
	_3DOTS: "<a:3dots:1526586411682107392>",
	FABRIC_ICON: "<:fabric_icon:1526585363316080650>",
	QUILT_ICON: "<:quilt_icon:1526585320177406126>",
	FORGE_ICON: "<:forge_icon:1526585245829169183>",
	NEOFORGE_ICON: "<:neoforge_icon:1526585198702235708>",
	PAPERMC_ICON: "<:papermc_icon:1526585069379125391>",
	PURPUR_ICON: "<:purpur_icon:1526585018158415902>",
	SPIGOT_ICON: "<:spigot_icon:1526584970498412624>",
	FOLIA_ICON: "<:folia_icon:1526584900973760626>",
	BUKKIT_ICON: "<:bukkit_icon:1526584834929983508>",
	DATAPACK_ICON: "<:datapack_icon:1530501838577602695>",
	MMUN: '<:mmun:1526586553692852235>',
	DISCORD: '<:discord:1526586651915059210>',
	DISC_BOT: '<:disc_bot:1524100920877514814>',
	DISC_COMMUNITY: '<:disc_community:1524100869660999802>'
}

export const LINKS = { // idem; replace with yours
	DISCORD_GUILD: {
		CREDITS: "https://discord.gg/WfF5mmUpX6",
		CONFIG: 'https://discord.gg/5KDYQ5uF7H'
	},
	BOT_OAUTH: "https://ptb.discord.com/oauth2/authorize?client_id="+process.env.CLIENT_ID,
	BOT_WEBSITE: {
		ROOT: 'https://saddling-symphonic-consensus.ngrok-free.dev/',
		DOCUMENTATION: 'https://saddling-symphonic-consensus.ngrok-free.dev/docs/',
		PANEL: 'https://saddling-symphonic-consensus.ngrok-free.dev/panel/'
	}
}