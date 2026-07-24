import minimist from 'minimist'
import genservicefile from './genservicefile'
import { translate } from '../src/i18n'
import { LANG, SCRIPTS } from '../src/constants'

const args: Record<string, string> = minimist(process.argv.slice(2))
const [ script ]: string | undefined = args._

export const helpStr = () => console.log(translate('scripts.usage', LANG.DEFAULT))

if (SCRIPTS.includes(script)) {
	console.info(`\x1b[0;2;35m$ \x1b[0;1;90m${script}.ts\x1b[0m`)
}

switch (script) {
	case 'genservicefile': {
		genservicefile()
		break
	}
	
	default: {
		helpStr()
		if (script) {
			console.error(translate('scripts.notFound', LANG.DEFAULT, { script }))
			process.exit(1)
		}
	}
}