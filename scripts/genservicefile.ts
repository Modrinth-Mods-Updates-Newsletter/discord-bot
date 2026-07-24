import fs from 'fs'
import template from '../templates/mmundiscbot.service.template' with { type: 'text' }

export default (): void => {
	const dir: string = import.meta.dirname
	const tempPath: string = process.execPath
	
	fs.writeFileSync('dist/mmundiscbot.service', template
		.replace('{bunDir}', tempPath)
		.replaceAll('{dir}', dir))
	
	console.info('Service file successfully generated')
}