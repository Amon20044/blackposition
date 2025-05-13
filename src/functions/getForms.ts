// lib/getForms.ts
import { cache } from 'react';
import 'server-only';

export const getForms = cache(async function getForms(
  pageAccessToken: string,
  adID: string
) {
  const url = `https://graph.facebook.com/v21.0/${adID}/leads?access_token=${pageAccessToken}`;
  const resp = await fetch(url, { next: { revalidate: 60 } }); // Optional ISR behavior
  return await resp.json();
});
