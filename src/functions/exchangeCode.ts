export async function exchangeCode(code: string) {
    const url = `https://graph.facebook.com/v21.0/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.HOST}/api/auth&client_secret=${process.env.CLIENT_SECRET}&code=${code}`;
    let resp = await fetch(url)
    return await resp.json();
}