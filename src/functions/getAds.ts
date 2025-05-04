export default async function getAds(userAccessToken: string, accID: string) {
    console.log(accID)
    const url = `https://graph.facebook.com/v21.0/${accID}/ads?fields=id,name&limit=1000&access_token=${userAccessToken}`;
    let resp = await fetch(url)
    return await resp.json();
}