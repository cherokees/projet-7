import React from 'react';
import Layout from './layout';
import { appFetch } from '../appFetch/appFetch';
import jwt from 'jsonwebtoken';

class Profil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
            email: "",
            firstName: "",
            lastName: "",
            createdDate: "",

            // redirection: false,
        }
    }

    async componentDidMount() {
        const token = JSON.parse(localStorage.getItem('access-token'));
        const payload = await jwt.decode(token);
        console.log("111", payload)
        console.log("222", payload.userId)


        const result = await appFetch('GET', '/user/profil/' + payload.userId);
        console.log(result);


        // users_created_date: "2020-10-30T13:44:12.000Z"
        // users_email: "ggg@gmail.com"
        // users_first_name: "ggg"
        // users_last_name: "ggg"

        if (result.status !== 200) {
            // alert("Redirection")
            // this.setState({ redirection: true })
            window.location = "/Accueil";
        }

        this.setState({ display: true });

    }



    render() {
        return (
            this.state.display ?
                (
                    <Layout>
                        <p>RANDOM</p>
                    </Layout>
                ) : null
        )
    }
}
export default Profil;


// dans didMount, setState où on met email, firstName, etc... 
// dans render, afficher les valeurs
//      email et createdDate en lecture
//      firstName et lastName : input
// bouton modifier => handleSubmit

// route put, AUTH!!!, avec :id en paramètre
// composer une requête SQL UPDATE pour changer firstName et lastName
// gérer les réponses (alerte)