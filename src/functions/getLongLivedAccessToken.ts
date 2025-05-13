import { cache } from 'react';
import 'server-only';

export const getLongLivedAccessToken = cache(async function getLongLivedAccessToken(userAccessToken: string) {
  const url = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&fb_exchange_token=${userAccessToken}`;
  const resp = await fetch(url);
  return await resp.json();
});
