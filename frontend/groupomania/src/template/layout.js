import React from 'react';
import { MdGpsFixed } from 'react-icons/md';
import Footer from './footer';
import Header from './header';

const style_accueil = {
    container: {
        backgroundImage: 'url("./images/city-ravi-patel.jpg")',
        opacity: '0.6',
        height: '100vh',
        width: '100%',
        position: "fixed",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
    }
}

// composant layout qui regroupe les composants header/footer ainsi que l'image de fonds
class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.handleHeaderLogout = this.handleHeaderLogout.bind(this);

    }

    handleHeaderLogout() {
        if (this.props.onHeaderLogout) {
            this.props.onHeaderLogout();
        }
    }

    render() {
        return (
            <>
                <Header auth={this.props.auth} onLogout={this.handleHeaderLogout} />
                <div className="container_bg_img" style={style_accueil.container}></div>
                {/* On précise l'endroit dans le layout ou l'on inclut les différents autres composants */}
                {this.props.children}
                <Footer />
            </>
        )
    }
}


export default Layout;