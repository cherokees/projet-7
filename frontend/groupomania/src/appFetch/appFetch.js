


// export async function appFetch(method, url, body) {
//     return await appFetchCore('application/json', method, url, body);
// }


// export async function appFetchFormData(method, url, body) {
//     // return await appFetchCore('multipart/form-data', method, url, body);
//     return await appFetchCore(undefined, method, url, body);
// }




// export async function appFetchCore(contentType, method, url, body) {
//     try {
//         const options = {
//             method,
//             headers: {
//                 'content-type': contentType,
//                 'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access-token'))
//             }
//         }
//         if (method !== 'GET') {
//             if (['POST', 'PUT'].includes(method) && !body) {
//                 console.error("Pas de body fourni à appFetch");
//             }
//             options.body = JSON.stringify(body);
//         }
//         const response = await fetch('http://localhost:3000' + url, options);

//         console.log("FETCH RESPONSE", response);

//         const responseJSON = await response.json();


//         console.log("FETCH RESPONSE JSON", response);

//         responseJSON.status = response.status;
//         return responseJSON;
//     } catch (err) {
//         throw err;
//     }
// }

export async function appFetch(method, url, body = {}) {
    try {
        const options = {
            method,
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access-token'))
            }
        }
        if (method !== 'GET') {
            options.body = JSON.stringify(body);
        }
        const response = await fetch('http://localhost:3000' + url, options);
        const responseJSON = await response.json();
        responseJSON.status = response.status;
        return responseJSON;
    } catch (err) {
        throw err;
    }
}
