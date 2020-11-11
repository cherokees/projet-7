import React from 'react';
import { appFetch } from '../appFetch/appFetch';
import Layout from './layout';

//fonction getErrorMessage qui liste dans un objet toutes les erreurs répértoriées et affichées dans la page d'erreur 
function getErrorMessage(errCode) {
    const liste = {
        404: "Page introuvable",
        403: "Accès non autorisé",
        401: "Accès non autorisé",
        500: "Une erreur est survenue",

    }
    //retourne l'erreur répértoriée ou une erreur 500 dans le cas contraire
    return liste[errCode] ? liste[errCode] : liste[500];
}

//Composant de la page d'erreur

class Error extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isConnected: false,
        }

    }

    async componentDidMount() {
        //On fait un appel fetch de type get pour que le serveur vérifie l'identité de l'utilisateur
        const result = await appFetch('GET', '/user/auth');


        if (result.status === 200) {
            this.setState({ isConnected: true });
        }

    }

    render() {

        //On récupère l'erreur présente dans l'url
        let urlObject = new URL(window.location.href);
        let errCode = urlObject.searchParams.get("code");

        if (!errCode) {
            errCode = "404";
        }


        return (
            <Layout auth={this.state.isConnected}>
                <div className="container_erreur">
                    <p>{getErrorMessage(errCode)}</p>
                </div>
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

