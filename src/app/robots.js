const BASE_URL = 'https://www.sagengineering.in';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/admin/', '/api/', '/op/', '/_next/'],
      },
      {
        // Block AI scrapers from training on site content
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai'],
        disallow:  '/',
      },
    ],
    sitemap:  `${BASE_URL}/sitemap.xml`,
    host:     BASE_URL,
  };
}
