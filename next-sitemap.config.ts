import { IConfig } from 'next-sitemap';

const config: IConfig = {
    siteUrl: 'https://mageui.live', // Replace with your actual domain
    generateRobotsTxt: true, // Generate a robots.txt file
    sitemapSize: 5000, // Default limit
};

export default config;
