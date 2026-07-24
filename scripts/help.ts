import { LANG } from "../src/constants"
import { translate } from "../src/i18n"

export default (): void => {
	console.info(translate('scripts.help', LANG.DEFAULT))
}