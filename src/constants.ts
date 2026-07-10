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
	TRUE: "<:true:1518215170080637009>",
	FALSE: "<:false:1518215169032065074>",
	ON: "<:on:1518243196767830126>",
	OFF: "<:off:1518234441212891206>",
	TRUE_JOIN: "<:true_join:1518234443385540620>",
	TRUE_JOIN_END: "<:true_join_end:1518234442450206871>",
	FALSE_JOIN: "<:false_join:1518234438633525429>",
	FALSE_JOIN_END: "<:false_join_end:1518234439933624400>",
	ON_JOIN: "<:on_join:1518244603021623496>",
	ON_JOIN_END: "<:on_join_end:1518244602044350644>",
	OFF_JOIN: "<:off_join:1518234437173772439>",
	OFF_JOIN_END: "<:off_join_end:1518234436053762108>",
	_3DOTS: "<a:3dots:1518296804087697570>",
	FABRIC_ICON: "<:fabric_icon:1517475209139978363>",
	QUILT_ICON: "<:quilt_icon:1517476031286607945>",
	FORGE_ICON: "<:forge_icon:1517476878242287626>",
	NEOFORGE_ICON: "<:neoforge_icon:1517496107587080233>",
	PAPERMC_ICON: "<:papermc_icon:1517497490054578177>",
	PURPUR_ICON: "<:purpur_icon:1517498713738707106>",
	SPIGOT_ICON: "<:spigot_icon:1517498983248035993>",
	FOLIA_ICON: "<:folia_icon:1517499610900332607>",
	BUKKIT_ICON: "<:bukkit_icon:1517499608798859425>",
	DATAPACK_ICON: "<:datapack_icon:1518548645522440232>",
	MMUN: '<:mmun:1523710584531452034>',
	DISCORD: '<:discord:1523712211862687855>',
	DISC_BOT: '<:disc_bot:1524100920877514814>',
	DISC_COMMUNITY: '<:disc_community:1524100869660999802>'
}

export const LINKS = { // idem; replace with yours
	DISCORD_GUILD_CREDITS: "https://discord.gg/WfF5mmUpX6",
	BOT_OAUTH: "https://ptb.discord.com/oauth2/authorize?client_id="+process.env.CLIENT_ID
}