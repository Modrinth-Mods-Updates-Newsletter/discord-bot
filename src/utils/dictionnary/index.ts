import fields from "./fields"

/**
 * Get the opposite of a string
 * @param str String
 */
export const getOpposite = (str: string): string => {
	for (const field of fields) {
		if (field[0] === str) return field[1]
		if (field[1] === str) return field[0]
	}

	throw new Error(`Field of ${str} not found`)
}

/**
 * Get the opposites of strings
 * @param strs Strings
 */
export const getOpposites = (strs: string[] | readonly string[]): string[] => {
	const rArray: string[] = []
	for (const str of strs) {
		rArray.push(getOpposite(str))
	}
	return rArray
}