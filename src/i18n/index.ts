import en from './en.json' with { type: 'json' }
import fr from './fr.json' with { type: 'json' }
import { LANG } from '../constants.js'
import type { Interaction } from 'discord.js'

const locales: Record<string, Record<string, any>> = { en, fr }

/**
 * Get a string from a language
 * @param key Key
 * @param lang Lang
 * @param vars Optionals variables
 * @returns The string
 */
export function translate(key: string, lang: string, vars: Record<string, string> = {}): string {
  const dict = locales[lang] || en
  const template = key.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), dict)
  const str = typeof template === 'string' ? template : key
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`))
}

/**
 * Get the lang from an interaction
 * @param interaction Interaction
 * @returns A lang
 * @see {@link LANG}
 */
export function getLangFromInteraction(interaction: Interaction): typeof LANG.DEFAULT {
  return interaction.locale.substring(0, 2)
}
