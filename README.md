# Pensiunea Pictorilor – Baia Mare

Site-ul nou al Pensiunii Pictorilor din Baia Mare (Strada Pictorilor nr. 1, centrul vechi), construit pe același design system ca site-ul Cuibul Viselor.

**Site vechi:** https://pensiuneapictorilor.ro

## Tehnologii

- [Astro](https://astro.build) – site static, rapid, cu imagini optimizate automat (WebP, srcset)
- Tailwind CSS v4
- GSAP + ScrollTrigger + SplitText (animații la scroll), Lenis (smooth scroll)
- PhotoSwipe (galerie foto cu lightbox)
- Fonturi self-hosted: Fraunces și Manrope

## Comenzi

```bash
npm install          # instalează dependențele
npm run dev          # server local pe http://localhost:4321/pensiune-pictori
npm run build        # generează site-ul în dist/
npm run preview      # previzualizează build-ul
npm run deploy       # construiește și publică site-ul pe GitHub Pages (ramura gh-pages)
npm run fetch-images # re-descarcă pozele de pe site-ul vechi în src/assets/photos
```

## Structură

```
src/
  continut/      # tot conținutul, în JSON (câte un fișier pe pagină)
  data/          # adaptoare care transformă conținutul pentru pagini
  assets/photos/ # pozele: camere/<cameră>/01.jpg…, obiective/<obiectiv>/01.jpg, exterior/
  components/    # componente reutilizabile (Header, Footer, RoomCard, SightCard, Gallery…)
  layouts/       # layout-ul de bază (SEO, meta, JSON-LD)
  pages/         # paginile site-ului
  scripts/       # animații și logica formularelor
  styles/        # design system (culori, tipografie, componente CSS)
```

## Pagini

| Pagină | Rută | Conținut |
| --- | --- | --- |
| Acasă | `/` | `acasa.json` |
| Camere + 9 pagini de cameră | `/camere`, `/camere/<slug>` | `camere.json` |
| Despre noi | `/despre-noi` | `despre.json` |
| Obiective + 6 pagini | `/locatii`, `/locatii/<slug>` | `obiective.json` |
| Galerie | `/galerie` | `galerie.json` + pozele camerelor |
| Recenzii | `/recenzii` | `recenzii.json` + notele camerelor |
| Contact, rezervare, întrebări | `/contact` | `contact.json` |
| Termeni și condiții | `/termeni-si-conditii` | `termeni.json` |

Rutele camerelor și ale obiectivelor sunt aceleași ca pe site-ul vechi, ca linkurile din Google să rămână valabile.

## Actualizarea conținutului

- **Telefon, adresă, rețele sociale, date firmă, meniu:** `src/continut/general.json`
- **Prețuri, descrieri, dotări, note ale camerelor:** `src/continut/camere.json`
- **Poze:** `src/assets/photos/<folder>/01.jpg, 02.jpg…` – ordinea e dată de nume; prima poză a unei camere e coperta

Titlurile folosesc `*steluțe*` pentru partea scrisă cursiv, ex. `Pensiunea *Pictorilor*`.

Rezervările se fac telefonic sau pe WhatsApp: formularul de pe `/contact` deschide WhatsApp cu cererea completată.

## Deploy

Pe GitHub Pages site-ul stă în `/pensiune-pictori`; pe Vercel, în rădăcina domeniului (detectat automat).
Pentru domeniul propriu, adresa se schimbă în `src/continut/general.json` → `seo.adresaSite`.

## Surse de conținut

Texte, tarife, recenzii și fotografii preluate de pe site-ul vechi al pensiunii (pensiuneapictorilor.ro).
