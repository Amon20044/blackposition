export async function getMe(accessToken: string) {
    const url = `https://graph.facebook.com/v21.0/me?fields=id,name,email&access_token=${accessToken}`;
    let resp = await fetch(url)
    return await resp.json();
}