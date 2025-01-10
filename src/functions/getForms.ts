export default async function getForms(pageAccessToken: string, adID: string) {
    const url = `https://graph.facebook.com/v21.0/${adID}/leads?access_token=${pageAccessToken}`;
    let resp = await fetch(url)
    return await resp.json();
}