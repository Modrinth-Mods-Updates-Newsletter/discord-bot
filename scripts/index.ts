import minimist from 'minimist'
import { translate } from '../src/i18n'
import { LANG } from '../src/constants'

import genservicefile from './genservicefile'
import help from './help'

export const scripts = [
	'genservicefile',
	'help'
]

const args: Record<string, string> = minimist(process.argv.slice(2))
const [ script ]: string | undefined = args._

export const helpStr = () => console.log(translate('scripts.usage', LANG.DEFAULT))

if (scripts.includes(script)) {
	console.info(`\x1b[0;2;35mØ \x1b[0;1;90m${script}.ts\x1b[0m`)
}

switch (script) {
	case 'genservicefile': {
		genservicefile()
		break
	}
	case 'help': {
		help()
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