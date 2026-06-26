export const dynamic = 'force-dynamic';

const BASE_URL = 'https://www.sagengineering.in';

const STATIC_PAGES = [
  { url: BASE_URL,                          priority: 1.0, changeFrequency: 'monthly'  },
  { url: `${BASE_URL}/about`,               priority: 0.8, changeFrequency: 'monthly'  },
  { url: `${BASE_URL}/contact`,             priority: 0.8, changeFrequency: 'monthly'  },
  { url: `${BASE_URL}/services`,            priority: 0.7, changeFrequency: 'monthly'  },
  { url: `${BASE_URL}/products/All`,        priority: 0.9, changeFrequency: 'weekly'   },
  { url: `${BASE_URL}/blog`,                priority: 0.6, changeFrequency: 'weekly'   },
  { url: `${BASE_URL}/gallery`,             priority: 0.5, changeFrequency: 'monthly'  },
  { url: `${BASE_URL}/catalogue`,           priority: 0.5, changeFrequency: 'monthly'  },
];

const PRODUCT_CATEGORIES = [
  'cooking-equipments',
  'bakery-equipments',
  'galley-equipment',
  'hospital-equipment',
  'fast-food-equipments',
  'food-processing-equipments',
  'washing-equipment',
  'refrigeration-equipments',
];

export default async function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_PAGES.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified:    now,
    changeFrequency,
    priority,
  }));

  const categoryEntries = PRODUCT_CATEGORIES.map(slug => ({
    url:             `${BASE_URL}/products/${slug}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.8,
  }));

  // Dynamic product pages from API
  let productEntries = [];
  try {
    const res  = await fetch(`${BASE_URL}/api/getproducts`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      productEntries = data.data
        .filter(p => p.slug)
        .map(p => ({
          url:             `${BASE_URL}/product/${p.slug}`,
          lastModified:    now,
          changeFrequency: 'weekly',
          priority:        0.7,
        }));
    }
  } catch {
    // silently skip — static pages still included
  }

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
