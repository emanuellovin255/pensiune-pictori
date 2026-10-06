/**
 * Tot conținutul editabil al site-ului stă în src/continut/*.json.
 * Texte, prețuri, camere, obiective, recenzii și întrebări: câte un fișier pe pagină.
 */
import general from '../continut/general.json';
import acasa from '../continut/acasa.json';
import camere from '../continut/camere.json';
import despre from '../continut/despre.json';
import obiective from '../continut/obiective.json';
import recenzii from '../continut/recenzii.json';
import contact from '../continut/contact.json';
import galerie from '../continut/galerie.json';
import termeni from '../continut/termeni.json';

export { general, acasa, camere, despre, obiective, recenzii, contact, galerie, termeni };

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Titlurile folosesc *steluțe* pentru partea scrisă cursiv, ex. „Pensiunea *Pictorilor*”.
 * Întoarce HTML sigur (textul e escapat), de folosit cu set:html.
 */
export function em(text: string | undefined, cls = ''): string {
  const klass = ['italic-serif', cls].filter(Boolean).join(' ');
  return escape(text ?? '').replace(/\*([^*]+)\*/g, `<em class="${klass}">$1</em>`);
}

/** Același text, fără steluțe (pentru alt, title, meta). */
export const plain = (text: string | undefined) => (text ?? '').replace(/\*/g, '');

/** 0756 420 992 → +40756420992 */
export function phoneIntl(phone: string): string {
  let d = phone.replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('0')) d = `40${d.slice(1)}`;
  return `+${d}`;
}
