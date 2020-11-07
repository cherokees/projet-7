import React from 'react';
import Layout from './layout';

//composent de la page d'accueil

class Accueil extends React.Component {
    render() {
        return (
            <Layout>
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