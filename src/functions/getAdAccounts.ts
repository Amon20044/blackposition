export default async function getAdAccounts(userAccessToken: string) {
    console.log(userAccessToken)
    const url = `https://graph.facebook.com/v21.0/me?fields=adaccounts{id,name,account_status}&access_token=${userAccessToken}`;
    let resp = await fetch(url)
    return await resp.json();
}