import axios from 'axios';

// const result = await axios.post('http://localhost:3000' + '/user/signup', formData);




export async function uploadFile(url, file) {

    try {
        const formData = new FormData();
        //On parcours les clés de l'objet body grâce à la méthode 'Object.keys' 
        //Pour utiliser cette méthode on doit mettre l'objet body en argument
        //Ensuite on parcours les valeurs de l'objet body avec un foreach (on précise la clé de la valeur recherché --> body[key] )

        // console.log("body", body);
        // if (body) {

        //     Object.keys(body).forEach((key) => {
        //          formData.append(key, body[key]);
        //     });
        // }

        formData.append('image', file);

        const response = await axios.post('http://localhost:3000' + url, formData);

        const responseData = response.data;
        responseData.status = response.status;
        return responseData;

    } catch (err) {
        throw err;
    }

}//fin fct




// const axiosInstance = axios.create({
//     // baseURL: 'http://localhost:3000',
//     // timeout: 10000,
//     headers: {
//         // 'Content-Type': 'multipart/form-data',
//         // "Access-Control-Allow-Origin": "*",
//         'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('access-token'))
//     },
// });

// export async function appFetch(method, url, body = {}) {
//     try {





//         // const methods = {
//         //     'GET': axios.get,
//         //     'POST': axios.post,
//         //     'PUT': axios.put,
//         //     'DELETE': axios.delete,
//         // };


//         const response = await axiosInstance.post('http://localhost:3000' + url, formData);
//         console.log(response);

//         const responseData = response.data;
//         responseData.status = response.status;
//         return responseData;
//     } catch (err) {
//         throw err;
//     }
// }