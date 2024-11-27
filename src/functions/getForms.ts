export default async function getForms(pageAccessToken: string) {
    const url = `https://graph.facebook.com/v21.0/me/leadgen_forms?access_token=${pageAccessToken}`;
    let resp = await fetch(url)
    return await resp.json();
}