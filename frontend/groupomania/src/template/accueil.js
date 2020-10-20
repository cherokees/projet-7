import React from 'react';

const style_accueil = {
    container: {
        backgroundImage: 'url("./images/city-ravi-patel.jpg")',
        opacity: '0.6',
        height: '60rem',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
    }
}

class Accueil extends React.Component {
    render() {
        return (
            <main className="container_accueil">
                <div className="container_bg_img" style={style_accueil.container}></div>
                <div className="container_accueil_titre">
                    <p>Bienvenue sur le tchat de GROUPOMANIA</p>
                </div>
            </main>
        )
    }
}

export default Accueil;