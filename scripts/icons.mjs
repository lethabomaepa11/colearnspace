import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
mkdirSync('static/icons', { recursive: true });
await sharp('static/site/branding/ColearnSpace-full.png')
	.trim()
	.png()
	.toFile('static/site/branding/colearn-logo.png');
const source = await sharp('static/site/branding/ColearnSpace-icon2.png').trim().png().toBuffer();
for (const [file, size, padding] of [
	['icon-192.png', 192, 20],
	['icon-512.png', 512, 52],
	['maskable-512.png', 512, 100],
	['apple-touch-icon.png', 180, 20]
]) {
	const logo = await sharp(source)
		.resize(size - padding * 2, size - padding * 2, { fit: 'inside' })
		.toBuffer();
	await sharp({ create: { width: size, height: size, channels: 4, background: '#FFFFFF' } })
		.composite([{ input: logo, gravity: 'centre' }])
		.png()
		.toFile('static/icons/' + file);
}
console.log('App icons resized from the supplied CoLearnSpace logo.');
