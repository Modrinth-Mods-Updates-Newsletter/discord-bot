import fs from 'fs'
import template from './mmundiscbot.service.template' with { type: 'text' }

const dir = import.meta.dirname
const tempPath = 'mmundiscbot.service.template'

const outputfile = fs.writeFileSync('mmundiscbot.service', template
  .replace('{bunDir}', process.execPath)
  .replaceAll('{dir}', dir))

console.info('Service file successfully generated')