import React from 'react';
import Layout from './layout';


function getErrorMessage(errCode) {
    const liste = {
        404: "Page introuvable",
        403: "Accès non autorisé",
        401: "Accès non autorisé",
        500: "Une erreur est survenue",

    }
    return liste[errCode] ? liste[errCode] : liste[500];
}

class Error extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     email: "",
        //     password: "",
        //     showPassword: false,
        //     loginSuccess: false,
    };

    render() {
        // console.log(new URLSearchParams(this.props.location.search))

        let urlObject = new URL(window.location.href);
        let errCode = urlObject.searchParams.get("code");

        if (!errCode) {
            errCode = "404";
        }


        return (
            <Layout>
                {/* {errCode} */}
                {getErrorMessage(errCode)}
            </Layout>
        )
    }
}


export default Error;



// css de la page error
// réviser le code et le commenter 
// etablire une liste de route pour les postes (forum)
// regarder comment fonctionne le code pour faire le forum et regarder 
// préparer les tables de la bdd à l'avance