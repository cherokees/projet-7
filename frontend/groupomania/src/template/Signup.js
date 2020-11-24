import React from 'react';
import { appFetch, appFetchFormData } from '../appFetch/appFetch';
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
            image: null,
        };

        // DEBUG
        // let rd = Math.floor(Math.random() * 30000);
        let rd = "babybel";
        this.state.email = rd + "@gmail.com";
        this.state.confirm_email = rd + "@gmail.com";
        this.state.password = rd;
        this.state.confirm_password = rd;
        this.state.firstName = rd;
        this.state.lastName = rd;
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
        this.handleChangeImage = this.handleChangeImage.bind(this);

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

    handleChangeImage(e) {
        e.preventDefault();

        // console.log(e.target.files);

        const file = Array.from(e.target.files)[0];
        // const formData = new FormData();
        // formData.append('profileImage', file);

        // console.log(formData.get('profileImage'));

        // this.setState({ image: e.target.value });
        this.setState({ image: file });
    }

    //fonction asynchrone pour l'envoie d'une requête fetch (inscription au forum)
    async handleSubmit(e) {
        e.preventDefault();


        try {

            // if else


            const formData = new FormData()

            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            formData.append('firstName', this.state.firstName);
            formData.append('lastName', this.state.lastName);
            formData.append('image', this.state.image);

            let body = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            }

            // console.log(body);

            const result = await appFetch('POST', '/user/signup', body);
            // const result = await appFetchFormData('POST', '/user/signup', formData);
            // console.log(result.status);
            // console.log(result);

            if (result.status === 200) {
                alert("Félicitations, vous êtes enregistré")
                this.setState({ signupSuccess: true });
            } else if (result.status === 400) {
                alert(result.message);
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
                                <div className="container_mdp_form_style">
                                    <input
                                        className="password_input_form"
                                        type={this.state.showPassword ? "text" : "password"}
                                        value={this.state.password}
                                        onChange={this.handleChangePassword}
                                        placeholder="Entrer votre mot de passe">
                                    </input>
                                </div>
                                <button className="password_button_form"
                                    onClick={this.handleShowPassword}> {this.state.showPassword ? "cacher" : "montrer"}
                                </button>
                            </div>

                            <div className="container_label">
                                <label className="confirm_password_label_form"> Confirmer votre de passe</label>
                                <div className="container_mdp_form_style">
                                    <input
                                        className="password_input_form"
                                        type={this.state.showConfirmPassword ? "text" : "password"}
                                        value={this.state.confirm_password}
                                        onChange={this.handleChangeConfirmPassword}
                                        placeholder="Confirmer votre mot de passe">
                                    </input>
                                </div>
                                <button className="password_button_form"
                                    onClick={this.handleShowConfirmPassword}> {this.state.showConfirmPassword ? "cacher" : "montrer"}
                                </button>
                            </div>

                            <div className="container_label">
                                <label className="img_profil"> Sélectionner une photo de profil</label>
                                <div className="container_img_profil">
                                    <input
                                        className="image_url"
                                        name="image"
                                        type="file"
                                        onChange={this.handleChangeImage}>
                                    </input>
                                </div>
                            </div>
                            <button className="button_form_submit" onClick={this.handleSubmit}>Envoyer</button>
                        </div>
                    </form>
                </Layout>
            )
        }

    }
}

export default Signup;