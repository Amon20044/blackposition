export default async function getPageTokens(userAccessToken: string) {
    const url = `https://graph.facebook.com/v21.0/me/accounts?access_token=${userAccessToken}`;
    let resp = await fetch(url)
    return await resp.json();

}