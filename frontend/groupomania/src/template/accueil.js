import React from 'react';
import { appFetch } from '../appFetch/appFetch';
import Layout from './layout';


//composent de la page d'accueil

class Accueil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isConnected: false,
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    async componentDidMount() {
        //On fait un appel fetch de type get pour que le serveur vérifie l'identité de l'utilisateur
        const result = await appFetch('GET', '/user/auth');


        if (result.status === 200) {
            this.setState({ isConnected: true });
        }

    }

    async handleLogout() {
        this.setState({ isConnected: false });
    }

    render() {
        return (
            <Layout auth={this.state.isConnected} onHeaderLogout={this.handleLogout}>

                <main className="container_accueil">
                    <div className="container_accueil_titre">
                        <p>Bienvenue sur le tchat de GROUPOMANIA</p>
                    </div>
                </main>
            </Layout>
        )

    }
}

export default Accueil;