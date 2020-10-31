import React from 'react';
import { Link } from 'react-router-dom';


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
    render() {
        return (
            <div className='container_header' style={styles.container}>
                <Link to='/'>
                    <div className="logo" style={styles.logo}></div>
                </Link>
                <div className='header_container_login'>
                    {/* <Link>
                        <div className="login">
                            <p>Logout</p>
                        </div>
                    </Link> */}

                    <Link to='/Login'>
                        <div className="login">
                            <p>Login</p>
                        </div>
                    </Link>
                    <Link to='/Signup'>
                        <div className="signup">
                            <p>Signup</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Header;