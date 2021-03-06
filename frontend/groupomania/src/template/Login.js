import React from 'react';
import { Redirect } from 'react-router';
import { appFetch } from '../utils/appFetch';
import Layout from './layout';
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineLogin } from 'react-icons/ai'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showPassword: false,
            loginSuccess: false,
        };

        // DEBUG
        this.state.email = "johndoe@gmail.com";
        this.state.password = "johndoe";


        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleShowPassword = this.handleShowPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChangeEmail(e) {
        e.preventDefault();
        this.setState({ email: e.target.value });
    }
    handleChangePassword(e) {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    handleShowPassword(e) {
        e.preventDefault();
        this.setState({ showPassword: !this.state.showPassword });
    }

    async handleSubmit(e) {
        e.preventDefault();


        try {
            let body = {
                email: this.state.email,
                password: this.state.password,
            }

            const result = await appFetch('POST', '/user/login', body);

            if (result.status === 200) {
                // localStorage.setItem("user-id", JSON.stringify(result.userId));
                localStorage.setItem("access-token", JSON.stringify(result.token));
                this.setState({ loginSuccess: true });
            } else if (result.status === 400) {
                alert(result.message)
            } else {
                alert("Une erreur s'est produite, veuillez rééssayer plus tard")
            }

        } catch (err) {
            console.error('erreur login', err);
        }

    }

    render() {

        if (this.state.loginSuccess === true) {
            return (
                <Redirect to="/Chat" />
            )
        } else {

            return (
                <Layout>
                    <form className="form_login">
                        <div className="container_form">
                            <div className="container_form_style">
                                <label className="email_label_form"> Email</label>
                                <input className="email_input_form"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail}
                                    placeholder="Entrer votre Email">
                                </input>
                                <label className="password_label_form"> Mot de passe</label>
                                <div className="container_style_input_form_login">
                                    <input className="password_input_form" type={this.state.showPassword ? "text" : "password"} value={this.state.password} onChange={this.handleChangePassword} placeholder="Entrer votre mot de passe"></input>
                                    <button className="password_button_form" onClick={this.handleShowPassword}> {this.state.showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                                </div>
                                <button className="button_form_submit" onClick={this.handleSubmit}><AiOutlineLogin /></button>
                            </div>
                        </div>
                    </form>

                </Layout>
            )

        }
    }
}

export default Login;