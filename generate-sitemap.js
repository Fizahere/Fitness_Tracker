import fs from 'fs'
import { SitemapStream,streamToPromise } from 'sitemap';

const BASE_URL = 'https://fitness-tracker-red-five.vercel.app'; 

const pages = [
  '/',
  '/dashboard',
  '/workout',
  '/nutrition',
  '/posts',
  '/progress',
  '/profile',
  '/explore',
  '/login',
  '/create-new-account',
];

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  pages.forEach((page) => {
    sitemap.write({ url: page, changefreq: 'weekly', priority: 0.8 });
  });

  sitemap.end();

  const sitemapData = await streamToPromise(sitemap);

  fs.writeFileSync('./public/sitemap.xml', sitemapData.toString());

  console.log('✅ Sitemap generated successfully!');
};

generateSitemap();
