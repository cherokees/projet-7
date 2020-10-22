import React from 'react';


class Test extends React.Component {
    render() {
        return (
            <h1>{this.props.text}</h1>
        );
    }
}


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showPassword: false,
        };

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

        fetch('http://localhost:3000/api/login', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: { 'content-type': 'application/json' }
        })
            .then((response) => {
                return response.json();
            })
            .then((login_value) => {
                console.log(login_value);
            })
    }

    render() {
        return (
            <>
                <form className="form_login">
                    <div className="container_form">
                        <label className="email_label_form"> Email</label>
                        <input className="email_input_form" type="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="Entrer votre Email"></input>
                        <label className="password_label_form"> Mot de passe</label>
                        <div>
                            <input className="password_input_form" type={this.state.showPassword ? "text" : "password"} value={this.state.password} onChange={this.handleChangePassword} placeholder="Entrer votre mot de passe"></input>
                            <button className="password_button_form" onClick={this.handleShowPassword}> {this.state.showPassword ? "cacher" : "montrer"}</button>
                        </div>
                        <button className="button_form_submit" onClick={this.handleSubmit}>Envoyer</button>
                    </div>
                </form>

            </>
        )
    }
}

export default Login;