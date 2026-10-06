import { Coffee, Wifi, Snowflake, Bath, Refrigerator, Tv, SquareParking, Clock, Check } from '@lucide/astro';

/** Iconurile folosite în src/continut/*.json (câmpul „icon”). */
export const ICONS = { Coffee, Wifi, Snowflake, Bath, Refrigerator, Tv, SquareParking, Clock, Check } as const;

export function icon(name: string | undefined) {
  return (name && ICONS[name as keyof typeof ICONS]) || Check;
}
