import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
}

export const client = createClient({
  projectId: 'clhnuvhg',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03', // Use the latest API version
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: string | object): string => 
  builder.image(source).auto('format').fit('max').url();