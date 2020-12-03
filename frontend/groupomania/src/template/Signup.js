import React from 'react';
import { appFetch, appFetchFormData } from '../utils/appFetch';
import { Redirect } from 'react-router-dom';
import Layout from './layout';
import axios from 'axios';
import { uploadFile } from '../utils/upload';
import { validateSubmit, VLD_IS_EMAIL, VLD_NOT_EMPTY_STRING } from '../utils/frontValidator';

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
            image: "",
            validationReport: {},
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

    async handleChangeImage(e) {
        e.preventDefault();

        const file = Array.from(e.target.files)[0];
        console.log("111", file);


        if (file) {

            const result = await uploadFile("/upload/image", file);
            console.log("upload RES", result);
            this.setState({ image: result.data });
        } else {

            this.setState({ image: e.target.value });
        }

    }

    //fonction asynchrone pour l'envoie d'une requête fetch (inscription au forum)
    async handleSubmit(e) {
        e.preventDefault();


        try {

            // if else


            // console.log("this.state.image", this.state.image);

            // React
            // lastModified: 1598026637520
            // lastModifiedDate: Fri Aug 21 2020 18:17:17 GMT+0200 (heure d’été d’Europe centrale) {}
            // name: "indien.jpg"
            // size: 19782
            // type: "image/jpeg"
            // webkitRelativePath: ""
            // __proto__: File

            // Multer avec postman
            // fieldname: 'image',
            // originalname: 'indien.jpg',
            // encoding: '7bit',
            // mimetype: 'image/jpeg'


            let body = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                image: this.state.image,
            }


            const validationReport = validateSubmit(body, {
                email: [VLD_IS_EMAIL],
                password: [VLD_NOT_EMPTY_STRING],
                firstName: [VLD_NOT_EMPTY_STRING],
                lastName: [VLD_NOT_EMPTY_STRING],
            })

            // console.log(body);

            // vérifier object.keys  taille = 0


            if (Object.keys(validationReport).length === 0) {

                // DANS IF (rapport vide)
                const result = await appFetch('POST', '/user/signup', body);

                if (result.status === 200) {
                    alert("Félicitations, vous êtes enregistré")
                    this.setState({ signupSuccess: true });
                } else if (result.status === 400) {
                    alert(result.message);
                } else {
                    alert("Une erreur s'est produite, veuillez rééssayer plus tard")
                }
            } else {
                console.log("validationReport", validationReport);

                this.setState({ validationReport })
            }

            // ELSE (erreurs validation front)


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
                    <form className="form_signup" enctype="multipart/form-data">
                        <div className="container_form">
                            <div className="container_form_style">
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
                                        {/* {this.state.emailError} */}
                                        {this.state.validationReport.email && this.state.validationReport.email}
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
                                    <input
                                        className="password_input_form"
                                        type={this.state.showPassword ? "text" : "password"}
                                        value={this.state.password}
                                        onChange={this.handleChangePassword}
                                        placeholder="Entrer votre mot de passe">
                                    </input>
                                    <button className="password_button_form"
                                        onClick={this.handleShowPassword}> {this.state.showPassword ? "cacher" : "montrer"}
                                    </button>
                                </div>

                                <div className="container_label">
                                    <label className="confirm_password_label_form"> Confirmer votre de passe</label>
                                    <input
                                        className="password_input_form"
                                        type={this.state.showConfirmPassword ? "text" : "password"}
                                        value={this.state.confirm_password}
                                        onChange={this.handleChangeConfirmPassword}
                                        placeholder="Confirmer votre mot de passe">
                                    </input>
                                    <button className="password_button_form"
                                        onClick={this.handleShowConfirmPassword}> {this.state.showConfirmPassword ? "cacher" : "montrer"}
                                    </button>
                                </div>

                                <div className="container_label">
                                    <label for="file" class="label-file">Choisir une image</label>
                                    <input id="file" class="input-file" type="file" onChange={this.handleChangeImage}></input>
                                    {this.state.image && <img className="img_file" src={'http://localhost:3000/public/uploads/' + this.state.image} />}
                                </div>
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