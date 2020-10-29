

export async function appFetch(url, body) {
    try {
        const response = await fetch('http://localhost:3000' + url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 'content-type': 'application/json' }
        });
        const responseJSON = await response.json();
        responseJSON.status = response.status;
        return responseJSON;
    } catch (err) {
        throw err;
    }
}