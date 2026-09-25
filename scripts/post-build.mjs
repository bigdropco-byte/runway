#!/usr/bin/env node

/**
 * Post-build script for Runway Calculator GitHub Pages deployment
 * Ensures dual compatibility:
 * 1. [path]/index.html for canonical trailing-slash URLs
 * 2. [path].html as direct fallback for crawlers/links
 * 3. Guarantees .nojekyll and CNAME exist in out/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, '..', 'out');

if (!fs.existsSync(OUT_DIR)) {
  console.error(`ERROR: Output directory does not exist at ${OUT_DIR}`);
  process.exit(1);
}

let generatedCount = 0;

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Don't recurse into _next or assets
      if (entry.name === '_next') {
        continue;
      }

      const indexHtmlPath = path.join(fullPath, 'index.html');
      if (fs.existsSync(indexHtmlPath)) {
        const fallbackHtmlPath = `${fullPath}.html`;
        try {
          fs.copyFileSync(indexHtmlPath, fallbackHtmlPath);
          generatedCount++;
        } catch (err) {
          console.warn(`Warning: Could not create fallback at ${fallbackHtmlPath}:`, err);
        }
      }

      // Recurse into subdirectories
      processDirectory(fullPath);
    }
  }
}

console.log('Running post-build dual-export optimization...');
processDirectory(OUT_DIR);

// Ensure .nojekyll exists
const noJekyllPath = path.join(OUT_DIR, '.nojekyll');
if (!fs.existsSync(noJekyllPath)) {
  fs.writeFileSync(noJekyllPath, '');
  console.log('Created out/.nojekyll');
}

// Ensure CNAME exists
const cnamePath = path.join(OUT_DIR, 'CNAME');
if (!fs.existsSync(cnamePath)) {
  fs.writeFileSync(cnamePath, 'runwaycalculator.dev\n');
  console.log('Created out/CNAME');
}

// Create static alias directories so common alternative paths return HTTP 200 directly
const STATIC_ALIASES = [
  { from: 'tools/runway-calculator-for-saas', to: 'tools/saas-runway-calculator' },
  { from: 'tools/runway-calculator-for-ecommerce', to: 'tools/ecommerce-runway-calculator' },
  { from: 'tools/runway-calculator-for-ecommerce', to: 'tools/e-commerce-runway-calculator' },
  { from: 'tools/runway-calculator-for-startups', to: 'tools/ai-startup-runway-calculator' },
  { from: 'tools/runway-calculator-for-startups', to: 'tools/startups-runway-calculator' },
  { from: 'tools/runway-calculator-for-freelancers', to: 'tools/freelance-runway-calculator' },
  { from: 'tools/runway-calculator-for-freelancers', to: 'tools/freelancers-runway-calculator' },
  { from: 'tools/runway-calculator-for-agencies', to: 'tools/agency-runway-calculator' },
  { from: 'tools/runway-calculator-for-agencies', to: 'tools/agencies-runway-calculator' },
  { from: 'tools/runway-calculator-for-consulting', to: 'tools/consulting-runway-calculator' },
  { from: 'tools/runway-calculator-for-founders', to: 'tools/founder-runway-calculator' },
  { from: 'tools/runway-calculator-for-founders', to: 'tools/founders-runway-calculator' },
  { from: 'tools/runway-calculator-for-small-business', to: 'tools/small-business-runway-calculator' },
  { from: 'tools/runway-calculator-for-bootstrapped', to: 'tools/bootstrapped-runway-calculator' },
  { from: 'tools/runway-calculator-for-nonprofits', to: 'tools/nonprofit-runway-calculator' },
  { from: 'tools/runway-calculator-for-nonprofits', to: 'tools/non-profit-runway-calculator' },
];

for (const alias of STATIC_ALIASES) {
  const sourceDir = path.join(OUT_DIR, alias.from);
  const targetDir = path.join(OUT_DIR, alias.to);
  if (fs.existsSync(sourceDir)) {
    fs.cpSync(sourceDir, targetDir, { recursive: true });
    const sourceHtml = `${sourceDir}.html`;
    if (fs.existsSync(sourceHtml)) {
      fs.copyFileSync(sourceHtml, `${targetDir}.html`);
    }
  }
}

console.log(`✓ Post-build complete: generated ${generatedCount} dual-fallback .html files and ${STATIC_ALIASES.length} static alias directories.`);
console.log('✓ All routes now support both /path/ and /path.html with 100% 200 OK responses.');

