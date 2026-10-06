import { recenzii as r } from '../lib/continut';
import { rooms } from './rooms';

const totalReviews = rooms.reduce((s, x) => s + x.reviews, 0);
const weighted = rooms.reduce((s, x) => s + x.score * x.reviews, 0);

/** Nota medie a pensiunii: media notelor camerelor, ponderată cu numărul de recenzii. */
export const rating = {
  score: totalReviews ? Math.round((weighted / totalReviews) * 10) / 10 : 0,
  count: totalReviews,
  max: 5,
};

/** Notele fiecărei camere, de la cea mai apreciată. */
export const roomScores = rooms
  .filter((x) => x.score > 0)
  .map((x) => ({ label: x.short, slug: x.slug, score: x.score, count: x.reviews }))
  .sort((a, b) => b.score - a.score || b.count - a.count);

export const reviews = r.recenzii
  .filter((x) => x.text?.trim())
  .map((x) => ({ name: x.nume, room: x.camera, score: Number(x.nota) || 0, text: x.text }));

export const reviewSource = r.sursa;
export const showReviews = r.afiseaza !== false;

export const formatScore = (n: number) => n.toFixed(1).replace('.', ',');
