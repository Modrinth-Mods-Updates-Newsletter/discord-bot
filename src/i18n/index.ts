import en from './en.json' with { type: 'json' }
import fr from './fr.json' with { type: 'json' }
import { LANG } from '../constants.js'
import type { Interaction } from 'discord.js'

const locales: Record<string, Record<string, any>> = { en, fr }

export function translate(key: string, lang: string, vars: Record<string, string> = {}) {
  const dict = locales[lang] || en
  const template = key.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), dict)
  const str = typeof template === 'string' ? template : key
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`))
}

export function getLangFromInteraction(interaction: Interaction) {
  return interaction.locale.startsWith(LANG.FR) ? LANG.FR : LANG.EN
}
