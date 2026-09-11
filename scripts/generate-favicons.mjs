import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. Base Vector SVG for standard icons (squircle with subtle padding & border)
const svgStandard = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'>
  <defs>
    <linearGradient id='bgGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#6366F1'/>
      <stop offset='45%' stop-color='#4F46E5'/>
      <stop offset='100%' stop-color='#3730A3'/>
    </linearGradient>
    <filter id='shadow' x='-10%' y='-10%' width='120%' height='120%'>
      <feDropShadow dx='0' dy='8' stdDeviation='12' flood-color='#1E1B4B' flood-opacity='0.28'/>
    </filter>
  </defs>

  <!-- Squircle Canvas -->
  <rect x='16' y='16' width='480' height='480' rx='108' ry='108' fill='url(#bgGrad)'/>
  <rect x='16' y='16' width='480' height='480' rx='108' ry='108' fill='none' stroke='white' stroke-opacity='0.22' stroke-width='4'/>

  <g filter='url(#shadow)'>
    <!-- Calculator Body Outline -->
    <rect x='124' y='96' width='264' height='320' rx='46' ry='46' fill='none' stroke='white' stroke-width='28'/>

    <!-- Display Screen -->
    <rect x='164' y='136' width='184' height='46' rx='16' ry='16' fill='white'/>

    <!-- Keypad Buttons -->
    <!-- Row 1 -->
    <circle cx='180' cy='232' r='19' fill='white'/>
    <circle cx='256' cy='232' r='19' fill='white'/>
    <circle cx='332' cy='232' r='19' fill='white'/>

    <!-- Row 2 -->
    <circle cx='180' cy='300' r='19' fill='white'/>
    <circle cx='256' cy='300' r='19' fill='white'/>

    <!-- Row 3 -->
    <circle cx='180' cy='368' r='19' fill='white'/>
    <circle cx='256' cy='368' r='19' fill='white'/>

    <!-- Tall Action Key -->
    <rect x='313' y='281' width='38' height='106' rx='19' ry='19' fill='white'/>
  </g>
</svg>`;

// 2. Full-bleed Vector SVG for Android maskable icon
const svgMaskable = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'>
  <defs>
    <linearGradient id='bgGradM' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#6366F1'/>
      <stop offset='45%' stop-color='#4F46E5'/>
      <stop offset='100%' stop-color='#3730A3'/>
    </linearGradient>
    <filter id='shadowM' x='-10%' y='-10%' width='120%' height='120%'>
      <feDropShadow dx='0' dy='8' stdDeviation='12' flood-color='#1E1B4B' flood-opacity='0.28'/>
    </filter>
  </defs>

  <!-- Full-bleed background -->
  <rect x='0' y='0' width='512' height='512' fill='url(#bgGradM)'/>

  <g filter='url(#shadowM)'>
    <!-- Calculator Body Outline scaled to stay within 80% safe zone -->
    <rect x='136' y='110' width='240' height='292' rx='42' ry='42' fill='none' stroke='white' stroke-width='26'/>

    <!-- Display Screen -->
    <rect x='172' y='146' width='168' height='42' rx='15' ry='15' fill='white'/>

    <!-- Keypad Buttons -->
    <circle cx='187' cy='234' r='17' fill='white'/>
    <circle cx='256' cy='234' r='17' fill='white'/>
    <circle cx='325' cy='234' r='17' fill='white'/>

    <circle cx='187' cy='296' r='17' fill='white'/>
    <circle cx='256' cy='296' r='17' fill='white'/>

    <circle cx='187' cy='358' r='17' fill='white'/>
    <circle cx='256' cy='358' r='17' fill='white'/>

    <!-- Tall Action Key -->
    <rect x='308' y='279' width='34' height='96' rx='17' ry='17' fill='white'/>
  </g>
</svg>`;

export async function generateFavicons() {
  const stdBuf = Buffer.from(svgStandard);
  const maskBuf = Buffer.from(svgMaskable);

  // Write SVGs
  fs.writeFileSync('public/favicon.svg', svgStandard);
  fs.writeFileSync('public/icon.svg', svgStandard);

  // Render PNGs for public
  await sharp(stdBuf).resize(512, 512).png().toFile('public/icon-512.png');
  await sharp(stdBuf).resize(512, 512).png().toFile('public/icon.png');
  await sharp(stdBuf).resize(512, 512).png().toFile('public/favicon.png');
  await sharp(stdBuf).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(stdBuf).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  await sharp(stdBuf).resize(48, 48).png().toFile('public/favicon-48x48.png');
  await sharp(stdBuf).resize(32, 32).png().toFile('public/favicon-32x32.png');
  await sharp(stdBuf).resize(16, 16).png().toFile('public/favicon-16x16.png');

  // Render Maskable for public
  await sharp(maskBuf).resize(512, 512).png().toFile('public/icon-maskable-512.png');

  // Render for app/ directory
  await sharp(stdBuf).resize(512, 512).png().toFile('app/icon.png');
  await sharp(stdBuf).resize(180, 180).png().toFile('app/apple-icon.png');

  // Generate ICO containing 16x16, 32x32, 48x48
  const b16 = await sharp(stdBuf).resize(16, 16).png().toBuffer();
  const b32 = await sharp(stdBuf).resize(32, 32).png().toBuffer();
  const b48 = await sharp(stdBuf).resize(48, 48).png().toBuffer();

  const images = [
    { width: 16, height: 16, buffer: b16 },
    { width: 32, height: 32, buffer: b32 },
    { width: 48, height: 48, buffer: b48 }
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + (images.length * 16);
  const dirEntries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...images.map(img => img.buffer)]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('app/favicon.ico', icoBuffer);

  console.log('Successfully generated all SEO-friendly favicons & icons.');
}

generateFavicons().catch(console.error);
