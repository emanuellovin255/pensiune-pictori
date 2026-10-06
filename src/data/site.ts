import { general as g, contact as c, phoneIntl } from '../lib/continut';

const phoneE164 = phoneIntl(g.telefon);
const whatsappE164 = phoneIntl(g.whatsapp);

export const site = {
  name: g.nume,
  shortName: g.numeScurt,
  description: g.descriere,
  phone: g.telefon,
  phoneE164,
  phoneHref: `tel:${phoneE164}`,
  whatsapp: g.whatsapp,
  whatsappHref: `https://wa.me/${whatsappE164.slice(1)}`,
  email: g.email,
  address: {
    street: g.adresa.strada,
    city: g.adresa.oras,
    county: g.adresa.judet,
    country: g.adresa.tara,
  },
  mapsQuery: g.cautareHarta,
  checkIn: g.checkIn,
  checkOut: g.checkOut,
  social: g.retele,
  company: g.firma,
};

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.county}`;

export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=16&output=embed`;
export const mapsLink = g.linkHarta || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export const nav = g.meniu.map((m) => ({ href: m.link, label: m.eticheta }));

export const faq = c.intrebari.map((f) => ({ q: f.intrebare, a: f.raspuns }));
