import { createClient } from '@sanity/client';

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables');
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET in environment variables');
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production', // Enable CDN in production
});