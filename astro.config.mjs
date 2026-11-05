// @ts-check
import { defineConfig } from 'astro/config';

// Site publié sur GitHub Pages : https://flomtz2312.github.io/portfolio/
// Avec un dépôt flomtz2312.github.io, mettre base: '/'.
export default defineConfig({
  site: 'https://flomtz2312.github.io',
  base: '/portfolio',
  trailingSlash: 'ignore',
});
