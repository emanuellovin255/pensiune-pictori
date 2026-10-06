import { obiective } from '../lib/continut';

export const sights = obiective.obiective.map((o) => ({
  slug: o.slug,
  name: o.nume,
  price: Number(o.pret) || 0,
  description: o.descriere.filter(Boolean),
  distance: o.distanta,
  walk: o.timp,
  hours: o.program.filter(Boolean),
  phone: o.telefon,
  tickets: o.bilete.filter(Boolean),
  address: o.adresa,
  photo: o.poza,
}));

export type Sight = (typeof sights)[number];
