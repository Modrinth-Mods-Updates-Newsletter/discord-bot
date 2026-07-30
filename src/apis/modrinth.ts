import axios from "axios"
import { REGEX } from "../constants"

/**
 * A simple function which fetch Modrinth's API
 * @param modSlug The mod slug to fetch
 * @returns the data associated to the mod you asked
 */
export const fetchModrinthAPI = async (modSlug: string): Promise<{
	doesModExist?: boolean,
	modName?: string,
	loaders?: string[],
	imgUrl?: string
}> => {
	let doesModExist: boolean = true

	if (!REGEX.MODRINTH_PROJECT_ID.test(modSlug)) doesModExist = false
	const r = (await axios.get(`https://api.modrinth.com/v2/project/${modSlug}`, {
		responseType: "json",
		httpAgent: "mmun-bot"
	}).catch(() => { doesModExist = false }))
	if (!r) return {}
	const { data } = r

	return {
		doesModExist,
		modName: data.title,
		loaders: data.loaders,
		imgUrl: data.icon_url
	}
}