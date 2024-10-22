import { createClient } from '@sanity/client';

import createImageUrlBuilder from '@sanity/image-url';



export const client = createClient({

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,

  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  useCdn: process.env.NODE_ENV === 'production',

  apiVersion: '2023-04-01',

});



const builder = createImageUrlBuilder(client);



export const urlFor = (source: string | object): string => 

  builder.image(source).auto('format').fit('max').url();


