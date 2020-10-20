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

class Header extends React.Component {
    render() {
        return (
            <div className='container_header' style={styles.container}>
                <div className="logo" style={styles.logo}>
                </div>
                <div className='header_container_login'>
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