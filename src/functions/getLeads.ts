export default async function getLeads(formID: string, accessToken: string) {
    const url = `https://graph.facebook.com/v21.0/${formID}/leads?access_token=${accessToken}`;
    let resp = await fetch(url)
    return await resp.json();
}