import React from 'react';
import Footer from './footer';
import Header from './header';

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

class Layout extends React.Component {
    render() {
        return (
            <>
                <Header auth={this.props.auth} />
                <div className="container_bg_img" style={style_accueil.container}></div>
                {this.props.children}
                <Footer />
            </>
        )
    }
}


export default Layout;