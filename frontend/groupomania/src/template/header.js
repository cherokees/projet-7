import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { appHistory } from '../App';

//const/objet qui contient le CSS permanent au composant
const styles = {
    container: {
        width: '100%',
        height: '4rem',
        display: 'flex',
    },
    logo: {
        backgroundImage: 'url("./images/logo-groupomania.png")',
        backgroundSize: 'contain',
        width: '4rem',
        height: '4rem',
    },
}

// Profile (priorité 1)
// (Afficher le lien seulement si token)
// tu mets juste un bouton submit vers une route /testauth
// ajouter token qque part dans appfetch
// route /testauth (côté serveur) : vérifier auth si ok, juste un message


// Logout (priorité 2)
// 1- trouver un élément html valide (bouton)
// 2- utiliser window.confirm pour demander à l'utilisateur s'il veut se déconnecter
// 3- supprimer le token du LocalStorage
// 4- rediriger vers Login
// 5- trouver un moyen d'afficher soit Login & Signup, soit Logout

//Composant tête de page présent sur l'ensemble du site
class Header extends React.Component {
    constructor(props) {
        super(props);
        //bind des fonctions pour que le this corresponde au module et non à la fonction dans le render()
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    //fonction handleLogoutClick qui efface le token enregistré dans le localStorage et qui passe le boolLogin à faux (cela change le rendu du composant)
    handleLogoutClick() {
        // this.setState({ boolLogin: false })

        //effacer le localStorage et faire une redirection
        localStorage.removeItem('access-token');

        //faire une redirection vers la page d'accueil
        appHistory.push('/accueil');

        //lancer la prop onLogout (une fonction)
        if (this.props.onLogout) {
            this.props.onLogout();
        }
    }

    //composant header non connecté
    renderHeaderAccueil() {
        return (
            <>
                <Link to='/Login'>
                    <div className="login">
                        <button>Login</button>
                    </div>
                </Link>
                <Link to='/Signup'>
                    <div className="signup">
                        <p>Signup</p>
                    </div>
                </Link>
            </>
        )
    }

    //composant header connecté
    renderHeaderChat() {
        return (
            <>
                <Link to='/'>
                    <div className="logout">
                        <button onClick={this.handleLogoutClick}>Logout</button>
                    </div>
                </Link>
                <Link to='/profil'>
                    <div className="profil">
                        <p>profil</p>
                    </div>
                </Link>
                <Link to='/chat'>
                    <div className="forum">
                        <p>Forum</p>
                    </div>
                </Link>
            </>
        )
    }

    render() {
        //on définit le boolLogin en tant que propriété "auth"
        let boolLogin = this.props.auth;

        if (boolLogin === true) {
            return (
                <div className='container_header' style={styles.container}>
                    <Link to='/'>
                        <div className="logo" style={styles.logo}></div>
                    </Link>
                    <div className='header_container_login'>
                        {this.renderHeaderChat()}
                    </div>
                </div >
            )
        } else {
            return (
                <div className='container_header' style={styles.container}>
                    <Link to='/'>
                        <div className="logo" style={styles.logo}></div>
                    </Link>
                    <div className='header_container_login'>
                        {this.renderHeaderAccueil()}
                    </div>
                </div >
            )
        }
    }
}


export default Header;