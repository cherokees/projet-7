import React from 'react';

class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showPassword: false,
            showConfirmPassword: false,
            confirm_email: "",
            confirm_password: "",
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleShowPassword = this.handleShowPassword.bind(this);
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


    }


    render() {
        return (
            <>
                <form className="form_signup">
                    <div className="container_form">
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

export default Signup;