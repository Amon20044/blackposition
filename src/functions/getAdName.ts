export default async function getAdName(userAccessToken: string, formID: string) {
    const url = `https://graph.facebook.com/v21.0/${formID}?fields=id,name&access_token=${userAccessToken}`;
    let resp = await fetch(url)
    return await resp.json();
}