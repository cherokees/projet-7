

export async function appFetch(url, body) {
    return new Promise(async (resolve, reject) => {

        fetch('http://localhost:3000' + url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 'content-type': 'application/json' }
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                // console.log(responseJSON);
                resolve(responseJSON);
            })
            .catch(err => reject(err));
    });
}