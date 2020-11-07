import React from 'react';
import { appFetch } from '../appFetch/appFetch';
import Layout from './layout';

//Composant de la page du forum

class Chat extends React.Component {

    constructor(props) {
        super(props);

        //valeur booléenne, qui sert a définir si le composant doit s'afficher ou non en fonction de la réponse du serveur
        this.state = {
            display: false,
        }
    }

    //fonction handleFetchErrors qui redirige l'utilisateur vers une page d'erreur, en fonction de la réponse serveur à l'aide de "props.history"
    //https://reactrouter.com/web/api/history

    handleFetchErrors(errStatus) {
        switch (errStatus) {
            case 404: this.props.history.replace('/error?code=404'); break;
            case 200: break;
            default: this.props.history.replace('/error?code=500'); break;
        }
    }

    //Dans la fonction componentDidMount(fonction native react pour le cycle de vie) 
    async componentDidMount() {
        //On fait un appel fetch de type post pour que le serveur vérifie l'identité de l'utilisateur
        const result = await appFetch('POST', '/user/auth');


        if (result.status !== 200) {
            if (result.status === 401) {
                //en cas d'erreur 401 on renvois l'utilisateur vers l'accueil
                this.props.history.replace("/Accueil");
            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                this.props.history.replace(`/error?code=${result.status}`);
            }
            return;
        }

        console.log("OK, pas d'erreur");
        //si l'utilisateur est autorisé, on affiche le composant chat
        this.setState({ display: true });
    }

    render() {
        return (
            this.state.display ?
                (
                    <Layout auth>
                        <div className="container_chat">
                            <div className="chat">

                            </div>
                        </div>
                    </Layout>
                )
                :
                null
        )
    }
}

export default Chat;