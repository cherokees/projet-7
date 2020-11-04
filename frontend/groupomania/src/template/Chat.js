import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { appFetch } from '../appFetch/appFetch';
import Layout from './layout';

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            display: false,
            // redirection: false,
        }
    }



    // Logout

    // Page d'édition de profil
    // componentDidMount => fetch vers une route user/profile*
    // cette route doit avoir le middleware auth
    // si on se fait sortir avec 401, redirection vers accueil (voir ci-dessous)/logout
    // si on reçoit 200 (succès), afficher un formulaire (identique à Signup??) => RELIRE LES SPECS, peut-etre une simple page statique

    // *(backend)
    // renvoie juste les données de l'utilisateur (essaie de capter l'id de l'utilisateur grâce au token, voir jwt.decode)


    handleFetchErrors(errStatus) {
        // rediriger vers la page d'erreur
        // OU vers une page alternative (ex: accueil si pas connecté, chat si connecté)
        switch (errStatus) {
            case 404: this.props.history.replace('/error?code=404'); break;
            case 200: break;
            default: this.props.history.replace('/error?code=500'); break;
        }
    }

    async componentDidMount() {
        const result = await appFetch('POST', '/user/auth');


        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace("/Accueil");
            } else {
                this.props.history.replace(`/error?code=${result.status}`);
            }
        }


        // code en cas d'erreur

        // handleFetchErrors(result.status);

        console.log("OK, pas d'erreur");

        // code si tout a fonctionné


        this.setState({ display: true });

        // console.log(this.props.history);

    }

    render() {

        // if (this.state.redirection) {
        //     return (
        //         <Redirect to='/accueil' />
        //     )
        // }


        return (

            // <Redirect to="/Login" />

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