// Descarcă pozele originale de pe site-ul vechi (pensiuneapictorilor.ro) în src/assets/photos/<folder>/01.jpg, 02.jpg…
// Pozele mari sunt micșorate la maximum 2400 px pe latura lungă, ca repo-ul să rămână ușor.
// Rulare: npm run fetch-images
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const OUT = 'src/assets/photos';
const BASE = 'https://pensiuneapictorilor.ro/wp-content/uploads/';

const JOBS = {
 "camere/camera-single": [
  "2022/02/034_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/02/035_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/02/036_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/02/039_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/02/037_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/02/038_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/02/032_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/02/033_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/02/IMG_6574.jpg"
 ],
 "camere/camera-single-superioara": [
  "2022/01/986B1571.jpg",
  "2022/01/IMG_3381-2-scaled.jpg",
  "2022/01/986B1570.jpg",
  "2022/01/IMG_3383-2-scaled.jpg",
  "2022/01/IMG_3386-2-scaled.jpg",
  "2022/01/IMG_3384-2-scaled.jpg",
  "2022/01/IMG_3387-2-scaled.jpg",
  "2022/01/IMG_3389-2-scaled.jpg",
  "2022/01/986B1572.jpg",
  "2022/01/986B1575.jpg",
  "2022/01/986B1576.jpg",
  "2022/01/986B1577.jpg",
  "2022/01/986B1579.jpg",
  "2022/01/986B1581.jpg",
  "2022/01/986B1582.jpg",
  "2022/01/986B1583.jpg",
  "2022/01/986B1585.jpg",
  "2022/01/986B1586.jpg",
  "2022/01/IMG_3385-2-scaled.jpg",
  "2022/01/IMG_3388-2-scaled.jpg"
 ],
 "camere/camera-matrimoniala": [
  "2022/02/397bfe51-7006-42fa-a55d-d1897b6bfcef-2.jpg",
  "2022/02/986B1556.jpg",
  "2022/02/0b5f92f6-ae91-4950-a873-6a816f444c1f-2.jpg",
  "2022/02/8d7e6e13-4dd8-451b-b3b3-feca78c60d7b-2.jpg",
  "2022/02/117b5b35-e034-455f-ba3e-31202e823577-2.jpg",
  "2022/02/986B1554.jpg",
  "2022/02/986B1555.jpg",
  "2022/02/986B1557.jpg",
  "2022/02/986B1559.jpg",
  "2022/02/986B1560.jpg",
  "2022/02/986B1562.jpg",
  "2022/02/986B1564.jpg",
  "2022/02/986B1565.jpg",
  "2022/02/986B1566.jpg",
  "2022/02/986B1567.jpg",
  "2022/02/986B1569.jpg",
  "2022/02/986B1551.jpg",
  "2022/02/986B1552.jpg"
 ],
 "camere/camera-twin-pictorilor": [
  "2022/04/camera-dubla-pictorilor-cazare-baia-mare-min.jpeg",
  "2022/04/045_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/04/046_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/04/047_Pensiunea-Pictorilor-2022-min.jpeg",
  "2022/04/066_Pensiunea_Pictorilor-min.jpeg",
  "2022/04/067_Pensiunea_Pictorilor-min.jpeg",
  "2022/04/068_Pensiunea_Pictorilor-min.jpeg"
 ],
 "camere/camera-de-lux-hollosy-simon": [
  "2022/03/986B1595.jpg",
  "2022/03/986B1601.jpg",
  "2022/03/986B1591.jpg",
  "2022/03/986B1597.jpg",
  "2022/02/056_Pensiunea-Pictorilor-2022.jpeg",
  "2022/02/057_Pensiunea-Pictorilor-2022.jpeg",
  "2022/02/055_Pensiunea-Pictorilor-2022.jpeg",
  "2022/03/WhatsApp-Image-2025-01-18-at-15.13.38-5.jpeg",
  "2022/03/986B1600.jpg",
  "2022/03/986B1599.jpg",
  "2022/03/986B1596.jpg",
  "2022/03/986B1593.jpg",
  "2022/03/986B1590.jpg",
  "2022/03/986B1589.jpg",
  "2022/03/986B1588.jpg"
 ],
 "camere/camera-de-lux-veso-agoston": [
  "2022/03/986B1534.jpg",
  "2022/03/986B1537.jpg",
  "2022/03/986B1532.jpg",
  "2022/03/012_Pensiunea-Pictorilor-2022.jpeg",
  "2022/03/011_Pensiunea-Pictorilor-2022.jpeg",
  "2022/03/986B1526.jpg",
  "2022/03/986B1527.jpg",
  "2022/03/986B1528.jpg",
  "2022/03/986B1530.jpg",
  "2022/03/986B1535.jpg",
  "2022/03/986B1548.jpg",
  "2022/03/986B1549.jpg",
  "2022/03/986B1547.jpg",
  "2022/03/986B1543.jpg",
  "2022/03/986B1541.jpg",
  "2022/03/986B1540.jpg",
  "2022/03/986B1539.jpg",
  "2022/03/004_Pensiunea-Pictorilor-2022.jpeg"
 ],
 "camere/camera-tripla": [
  "2022/03/061_Pensiunea_Pictorilor.jpeg",
  "2022/03/065_Pensiunea_Pictorilor.jpeg",
  "2022/03/069_Pensiunea_Pictorilor.jpeg",
  "2022/03/066_Pensiunea_Pictorilor.jpeg",
  "2022/03/068_Pensiunea_Pictorilor.jpeg",
  "2022/03/067_Pensiunea_Pictorilor.jpeg",
  "2022/03/062_Pensiunea_Pictorilor.jpeg",
  "2022/03/064_Pensiunea_Pictorilor.jpeg"
 ],
 "camere/tripla-de-lux-marisa-falbo": [
  "2022/03/IMG_9313-2-scaled.jpg",
  "2022/03/IMG_9330-2-scaled.jpg",
  "2022/03/IMG_9337-2-scaled.jpg",
  "2022/03/IMG_9335-2-scaled.jpg",
  "2022/03/IMG_9329-2-scaled.jpg",
  "2022/03/IMG_9324-2-scaled.jpg",
  "2022/03/IMG_9321-2-scaled.jpg",
  "2022/02/005_Pensiunea_Pictorilor.jpeg"
 ],
 "camere/apartament-eugen-pascu": [
  "2022/03/WhatsApp-Image-2025-01-18-at-15.03.03-4.jpeg",
  "2022/03/WhatsApp-Image-2025-01-18-at-15.03.03.jpeg",
  "2022/03/WhatsApp-Image-2025-01-18-at-15.03.03-5.jpeg",
  "2022/03/WhatsApp-Image-2025-01-18-at-15.03.03-3.jpeg",
  "2022/03/WhatsApp-Image-2025-01-18-at-15.03.03-2.jpeg",
  "2022/03/WhatsApp-Image-2025-01-18-at-15.03.03-1.jpeg",
  "2022/03/WhatsApp-Image-2025-01-18-at-15.03.02.jpeg",
  "2022/03/WhatsApp-Image-2025-01-18-at-15.03.02-1.jpeg",
  "2022/03/WhatsApp-Image-2025-01-18-at-15.03.02-2.jpeg"
 ],
 "exterior": [
  "2022/02/Cazare-in-baia-mare-la-pensiunea-pictorilor.jpg",
  "2022/02/Cazare-in-centru-baia-mare.jpg"
 ],
 "obiective/planetariu": [
  "2022/01/planetariu.jpg"
 ],
 "obiective/turnul-stefan": [
  "2022/01/Turnul-stefan.jpg"
 ],
 "obiective/muzeul-de-mineralogie": [
  "2022/01/Muzeul-de-mineralogie-baia-mare.jpg"
 ],
 "obiective/colonia-pictorilor": [
  "2022/01/colonia-pictorulor-baia-mare.jpg"
 ],
 "obiective/muzeul-satului": [
  "2022/01/muzeul-satului-baia-mare.jpg"
 ],
 "obiective/bastionul-macelarilor": [
  "2022/01/Bastionul-Macelarilor-Baia-Mare1.jpg"
 ]
};

let ok = 0;
let total = 0;
for (const [folder, files] of Object.entries(JOBS)) {
  await mkdir(join(OUT, folder), { recursive: true });
  await Promise.all(
    files.map(async (file, i) => {
      total++;
      const res = await fetch(BASE + file, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) return console.warn('✗', res.status, file);
      const buf = await sharp(Buffer.from(await res.arrayBuffer()))
        .rotate()
        .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 84, mozjpeg: true })
        .toBuffer();
      await writeFile(join(OUT, folder, `${String(i + 1).padStart(2, '0')}.jpg`), buf);
      ok++;
    }),
  );
}
console.log(`${ok}/${total} imagini salvate în ${OUT}`);
