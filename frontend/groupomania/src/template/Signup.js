import React from 'react';
import { appFetch } from '../appFetch/appFetch';
import { Redirect } from 'react-router-dom';
import Layout from './layout';

class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            showPassword: false,
            showConfirmPassword: false,
            confirm_email: "",
            confirm_password: "",
            signupSuccess: false,
            emailError: "",
        };

        // DEBUG
        this.state.email = "123@gmail.com";
        this.state.confirm_email = "123@gmail.com";
        this.state.password = "123";
        this.state.confirm_password = "123";
        this.state.firstName = "123";
        this.state.lastName = "123";
        //

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleShowPassword = this.handleShowPassword.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeConfirmEmail = this.handleChangeConfirmEmail.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleShowConfirmPassword = this.handleShowConfirmPassword.bind(this);

    }

    //fonction de vérification de l'email saisie 
    handleChangeEmail(e) {
        e.preventDefault();

        if (!this.state.email.includes("@")) {
            this.setState({ emailError: "l'email saisie n'est pas correcte" });
        } else {
            this.setState({ emailError: "" });
        }

        this.setState({ email: e.target.value });
    }

    //fonction de confirmation de l'email
    handleChangeConfirmEmail(e) {
        e.preventDefault();

        this.setState({ confirm_email: e.target.value });
    }

    handleChangePassword(e) {
        e.preventDefault();

        this.setState({ password: e.target.value });
    }

    handleChangeFirstName(e) {
        e.preventDefault();

        this.setState({ firstName: e.target.value });
    }

    handleChangeLastName(e) {
        e.preventDefault();

        this.setState({ lastName: e.target.value });
    }

    handleChangeConfirmPassword(e) {
        e.preventDefault();

        this.setState({ confirm_password: e.target.value });
    }

    //fonction qui permet d'afficher le mdp saisie
    handleShowPassword(e) {
        e.preventDefault();

        this.setState({ showPassword: !this.state.showPassword });
    }

    handleShowConfirmPassword(e) {
        e.preventDefault();

        this.setState({ showConfirmPassword: !this.state.showConfirmPassword })
    }

    //fonction asynchrone pour l'envoie d'une requête fetch (inscription au forum)
    async handleSubmit(e) {
        e.preventDefault();


        try {

            // if else
            let body = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            }

            const result = await appFetch('POST', '/user/signup', body);
            // console.log(result.status);
            // console.log(result);

            if (result.status === 200) {
                alert("Félicitations, vous êtes enregistré")
                this.setState({ signupSuccess: true });
            } else if (result.status === 400) {
                alert("Cette email est déja enregistré")
            } else {
                alert("Une erreur s'est produite, veuillez rééssayer plus tard")
            }


        } catch (err) {
            console.error('erreur login', err);
        }

    }

    render() {
        //si la requête renvoie un status 200
        if (this.state.signupSuccess) {
            return (
                <Redirect to="/Chat" />
            );
        } else {

            return (
                <Layout>
                    <form className="form_signup">
                        <div className="container_form">
                            <div className="container_label">
                                <label>Prénom</label>
                                <input
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={this.handleChangeFirstName}
                                    placeholder="Entrer votre prénom">
                                </input>
                            </div>

                            <div className="container_label">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={this.handleChangeLastName}
                                    placeholder="Entrer votre nom">
                                </input>
                            </div>
                            <div className="container_label">
                                <label className="email_label_form"> Email</label>
                                <input
                                    className="email_input_form"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail}
                                    placeholder="Entrer votre Email">
                                </input>
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.emailError}
                                </div>
                            </div>

                            <div className="container_label">
                                <label className="confirm_email_label_form"> Confirmer votre email</label>
                                <input
                                    className="confirm_email_input_form"
                                    type="email"
                                    value={this.state.confirm_email}
                                    onChange={this.handleChangeConfirmEmail}
                                    placeholder="Confirmer votre Email">
                                </input>
                            </div>

                            <div className="container_label">
                                <label className="password_label_form"> Mot de passe</label>
                                <div>
                                    <input
                                        className="password_input_form"
                                        type={this.state.showPassword ? "text" : "password"}
                                        value={this.state.password}
                                        onChange={this.handleChangePassword}
                                        placeholder="Entrer votre mot de passe">
                                    </input>
                                    <button
                                        className="password_button_form"
                                        onClick={this.handleShowPassword}> {this.state.showPassword ? "cacher" : "montrer"}
                                    </button>
                                </div>
                            </div>

                            <div className="container_label">
                                <label className="confirm_password_label_form"> Confirmer votre de passe</label>
                                <div>
                                    <input
                                        className="password_input_form"
                                        type={this.state.showConfirmPassword ? "text" : "password"}
                                        value={this.state.confirm_password}
                                        onChange={this.handleChangeConfirmPassword}
                                        placeholder="Confirmer votre mot de passe">
                                    </input>
                                    <button
                                        className="password_button_form"
                                        onClick={this.handleShowConfirmPassword}> {this.state.showConfirmPassword ? "cacher" : "montrer"}
                                    </button>
                                </div>
                            </div>

                            <div className="container_button_submit">
                                <button className="button_form_submit" onClick={this.handleSubmit}>Envoyer</button>
                            </div>
                        </div>
                    </form>
                </Layout>
            )
        }

    }
}

export default Signup;