import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const BEFORE_PATH = '/home/z/my-project/public/images/before.png';
const AFTER_PATH = '/home/z/my-project/public/images/after.png';

// Shared angle/perspective description to ensure both images match
const SHOT_DESCRIPTION = `A front-facing, slightly angled view (30-degree left perspective) of a sleek desktop computer monitor sitting on a clean white desk in a bright, modern office environment. The monitor displays a full-screen website. Soft natural daylight from a window on the right side. Professional product photography style, studio lighting, shallow depth of field. The monitor is centered in the frame with subtle shadow on the desk surface.`;

const BEFORE_PROMPT = `${SHOT_DESCRIPTION} The website on screen is an outdated, poorly designed business website for an export/import company. The website looks like it was built in 2010: cluttered layout, mismatched garish colors (bright red, green, blue, yellow all competing), tiny unreadable text, Comic Sans and Times New Roman fonts, animated GIF banners, busy patterned background, no visual hierarchy, zero white space, too many stock photos crammed together, marquee text, beveled buttons with drop shadows, gradient header from blue to purple. Looks cheap, unprofessional, and dated. Screenshot mockup style.`;

const AFTER_PROMPT = `${SHOT_DESCRIPTION} The website on screen is a stunning, modern, premium business website for an export/import company called "Unnat Vega". The website is sleek and luxurious: clean modern sans-serif typography, vibrant orange (#F97316) accent colors against a pure white background, generous white space, professional hero section with a bold headline and call-to-action button, subtle gradient effects, modern card-based layout, smooth rounded corners, elegant navigation bar, beautiful product showcase section with hover effects. Premium, luxury web design aesthetic. Looks like a top-tier agency designed it. Screenshot mockup style.`;

async function generateImage(sdk, prompt, label) {
  console.log(`\n🎨 Generating ${label} image...`);
  console.log(`   Prompt (first 100 chars): ${prompt.substring(0, 100)}...`);

  const result = await sdk.images.generations.create({
    prompt: prompt,
    n: 1,
    size: "1024x1024"
  });

  if (!result.data || result.data.length === 0) {
    throw new Error(`No image data returned for ${label}`);
  }

  const imageData = result.data[0];

  if (imageData.base64) {
    return Buffer.from(imageData.base64, 'base64');
  } else if (imageData.url) {
    console.log(`   Downloading from URL...`);
    const base64 = await sdk.downloadImageAsBase64(imageData.url);
    return Buffer.from(base64, 'base64');
  } else {
    throw new Error(`No base64 or URL in response for ${label}: ${JSON.stringify(imageData).substring(0, 200)}`);
  }
}

async function main() {
  console.log('🚀 Initializing Z AI Web Dev SDK...');
  const sdk = await ZAI.create();
  console.log('✅ SDK initialized successfully');

  // Ensure output directory exists
  const outputDir = path.dirname(BEFORE_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate BEFORE image
  console.log('\n📸 === BEFORE IMAGE ===');
  const beforeBuffer = await generateImage(sdk, BEFORE_PROMPT, 'BEFORE');
  fs.writeFileSync(BEFORE_PATH, beforeBuffer);
  const beforeStats = fs.statSync(BEFORE_PATH);
  console.log(`✅ BEFORE image saved: ${BEFORE_PATH}`);
  console.log(`   Size: ${(beforeStats.size / 1024).toFixed(1)} KB`);

  // Generate AFTER image
  console.log('\n📸 === AFTER IMAGE ===');
  const afterBuffer = await generateImage(sdk, AFTER_PROMPT, 'AFTER');
  fs.writeFileSync(AFTER_PATH, afterBuffer);
  const afterStats = fs.statSync(AFTER_PATH);
  console.log(`✅ AFTER image saved: ${AFTER_PATH}`);
  console.log(`   Size: ${(afterStats.size / 1024).toFixed(1)} KB`);

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`  Before: ${BEFORE_PATH} (${(beforeStats.size / 1024).toFixed(1)} KB)`);
  console.log(`  After:  ${AFTER_PATH} (${(afterStats.size / 1024).toFixed(1)} KB)`);
  console.log('='.repeat(50));
  console.log('✨ Both images generated with matching perspective for before/after comparison!');
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
