import { camere } from '../lib/continut';

export interface Room {
  slug: string;
  name: string;
  /** Numele pe scurt, pentru carduri și formulare. */
  short: string;
  price: number;
  guests: number;
  beds: number;
  score: number;
  reviews: number;
  highlight: string;
  intro: string;
  /** Paragrafe; „## ” = subtitlu, „✔ ” = punct din listă. */
  description: string[];
  features: string[];
  /** Folderul de poze din src/assets/photos/ */
  folder: string;
}

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const rooms: Room[] = camere.camere
  .filter((c) => c.nume?.trim())
  .map((c) => ({
    slug: c.slug?.trim() || slugify(c.nume),
    name: c.nume,
    short: c.numeScurt || c.nume,
    price: Number(c.pret) || 0,
    guests: Number(c.persoane) || 0,
    beds: Number(c.paturi) || 0,
    score: Number(c.scor) || 0,
    reviews: Number(c.recenzii) || 0,
    highlight: c.evidentiere,
    intro: c.intro,
    description: (c.descriere ?? []).filter(Boolean),
    features: (c.dotari ?? []).filter(Boolean),
    folder: c.folderPoze || `camere/${slugify(c.nume)}`,
  }));

/** Condițiile de rezervare afișate lângă preț. */
export const bookingTerms = camere.conditii.filter(Boolean);

/** Informații valabile pentru toate camerele. */
export const houseInfo = camere.informatii.filter(Boolean);

const prices = rooms.map((r) => r.price).filter((p) => p > 0);
export const minPrice = prices.length ? Math.min(...prices) : 0;

export const beds = (n: number) => `${n} ${n === 1 ? 'pat' : 'paturi'}`;
export const guests = (n: number) => `${n} ${n === 1 ? 'persoană' : 'persoane'}`;

/** Împarte descrierea în blocuri: subtitluri, paragrafe și liste cu bife. */
export function descriptionBlocks(lines: string[]) {
  const blocks: ({ type: 'h' | 'p'; text: string } | { type: 'list'; items: string[] })[] = [];
  for (const line of lines) {
    if (line.startsWith('## ')) blocks.push({ type: 'h', text: line.slice(3) });
    else if (line.startsWith('✔')) {
      const item = line.replace(/^✔\s*/, '');
      const last = blocks[blocks.length - 1];
      if (last?.type === 'list') last.items.push(item);
      else blocks.push({ type: 'list', items: [item] });
    } else blocks.push({ type: 'p', text: line });
  }
  return blocks;
}
