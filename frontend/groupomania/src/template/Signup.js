import React from 'react';
import { appFetch } from '../appFetch/appFetch';

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
        };

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

    handleChangeEmail(e) {
        e.preventDefault();

        this.setState({ email: e.target.value });
    }

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

    handleShowPassword(e) {
        e.preventDefault();

        this.setState({ showPassword: !this.state.showPassword });
    }

    handleShowConfirmPassword(e) {
        e.preventDefault();

        this.setState({ showConfirmPassword: !this.state.showConfirmPassword })
    }

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

            const result = await appFetch('/user/signup', body);
            console.log(result);

            // GESTION DE MESSAGES D'ERREUR (ALERTE)
            // 500: Un problème est survenu. Veuillez réessayer plus tard
            // 400 : affiche le message

            // 200 : cache le formulaire et affiche une boite de dialogue de succès

            // ------------------------------

            // else ici

            // dans constructor, crée une clé du state
            // pageErrors: { email: "", password: ""}


            // gérer l'affichage des erreurs
            // si pass !== cfPass => state.pageErrors.password = "Bla bla bla"

            // Ouverture/fermeture du state


        } catch (err) {
            console.error('erreur login', err);
        }

    }

    render() {

        // let disableSubmit = true
        // conditions if pass = cfpass etc...
        // => disableSubmit = false
        // + désactiver (disable) le bouton submit




        if (this.state.signupSuccess) {
            return (
                <div>OK</div>
            );
        } else {

            return (
                <>
                    <form className="form_signup">
                        <div className="container_form">
                            <label>Prénom</label>
                            <input type="text" value={this.state.firstName} onChange={this.handleChangeFirstName} placeholder="Entrer votre prénom"></input>

                            <label>Nom</label>
                            <input type="text" value={this.state.lastName} onChange={this.handleChangeLastName} placeholder="Entrer votre nom"></input>

                            <label className="email_label_form"> Email</label>
                            <input className="email_input_form" type="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Entrer votre Email"></input>

                            <label className="confirm_email_label_form"> Confirmer votre email</label>
                            <input className="confirm_email_input_form" type="email" value={this.state.confirm_email} onChange={this.handleChangeConfirmEmail} placeholder="Confirmer votre Email"></input>

                            <label className="password_label_form"> Mot de passe</label>
                            <div>
                                <input className="password_input_form" type={this.state.showPassword ? "text" : "password"} value={this.state.password} onChange={this.handleChangePassword} placeholder="Entrer votre mot de passe"></input>
                                <button className="password_button_form" onClick={this.handleShowPassword}> {this.state.showPassword ? "cacher" : "montrer"}</button>
                            </div>

                            <label className="confirm_password_label_form"> Confirmer votre de passe</label>
                            <div>
                                <input className="password_input_form" type={this.state.showConfirmPassword ? "text" : "password"} value={this.state.confirm_password} onChange={this.handleChangeConfirmPassword} placeholder="Confirmer votre mot de passe"></input>
                                <button className="password_button_form" onClick={this.handleShowConfirmPassword}> {this.state.showConfirmPassword ? "cacher" : "montrer"}</button>
                            </div>

                            <button className="button_form_submit" onClick={this.handleSubmit}>Envoyer</button>
                        </div>
                    </form>
                </>
            )
        }

    }
}

export default Signup;