import styles from './header.css';
import React from 'react';
import logo from '../images/icon-left-font.png'

class Header extends React.Component {
    render() {
        return (
            <div className='container_header'>
                <div className='logo' styles={{ backgroundImage: `url(${logo})` }}>
                </div>
                <div className='header_container_login'>
                    <div className="login">
                        <p>Login</p>
                    </div>
                    <div className="signup">
                        <p>Signup</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;