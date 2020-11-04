import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { appHistory } from '../App';


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

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        // this.state = { boolLogin: false };
    }

    async componentDidMount() {

    }

    handleLogoutClick() {
        this.setState({ boolLogin: false })

        //effacer le localStorage et faire une redirection
        localStorage.removeItem('access-token');

        appHistory.push('/accueil');

    }

    handleLoginClick() {
        this.setState({ boolLogin: true });
    }

    render() {
        // let boolLogin = this.state.boolLogin;
        let boolLogin = this.props.auth;

        if (boolLogin === true) {
            return (
                <div className='container_header' style={styles.container}>
                    <Link to='/'>
                        <div className="logo" style={styles.logo}></div>
                    </Link>
                    <div className='header_container_login'>
                        <HeaderChat />
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
                        <HeaderAccueil />
                    </div>
                </div >
            )
        }
    }
}

class HeaderAccueil extends Header {
    render() {
        return (
            <>
                <Link to='/Login'>
                    <div className="login">
                        <button onClick={this.handleLoginClick}>Login</button>
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
}
class HeaderChat extends Header {
    render() {
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
            </>
        )
    }
}

export default Header;