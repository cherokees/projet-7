import React from 'react';
import Layout from './layout';
import { appFetch } from '../utils/appFetch';
import jwt from 'jsonwebtoken';
import { uploadFile } from '../utils/upload';

class Profil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false,
            email: "",
            firstName: "",
            lastName: "",
            createdDate: "",
            changeName: false,
            image: "",
            userId: "",

            // redirection: false,
        }

        this.handleName = this.handleName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async componentDidMount() {
        const token = JSON.parse(localStorage.getItem('access-token'));
        const payload = await jwt.decode(token);


        const result = await appFetch('GET', '/user/profil/' + payload.userId);

        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace("/Accueil");
            } else {
                this.props.history.replace(`/error?code=${result.status}`);
            }
            return;
        }

        this.setState({
            display: true,
            email: result.data.users_email,
            firstName: result.data.users_first_name,
            lastName: result.data.users_last_name,
            createdDate: result.data.users_created_date,
            image: result.data.users_image,
            userId: result.data.users_id,
        });

    }

    handleName() {
        this.setState({ changeName: true })
    }

    handleChangeLastName(e) {
        this.setState({ lastName: e.target.value })
    }

    handleChangeFirstName(e) {
        this.setState({ firstName: e.target.value })
    }

    async handleDeleteProfile(e) {
        e.preventDefault();
        const token = await JSON.parse(localStorage.getItem('access-token'));
        const payload = await jwt.decode(token);
        const result = await appFetch('PUT', '/user/disable/' + payload.userId);

        if (result.status === 200) {
            localStorage.removeItem('access-token');
            this.props.history.replace("/Accueil");
        } else {
            this.props.history.replace(`/error?code=${result.status}`);
        }
        return;
    }

    async handleChangeImage(e) {
        e.preventDefault();

        const file = Array.from(e.target.files)[0];

        if (file) {

            const result = await uploadFile("/upload/image", file);
            this.setState({ image: result.data });
        } else {

            this.setState({ image: "" });
        }

    }

    async handleCancel() {
        this.setState({ changeName: false })

        const result = await appFetch('GET', '/user/profil/' + this.state.userId);

        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace("/Accueil");
            } else {
                this.props.history.replace(`/error?code=${result.status}`);
            }
            return;
        }

        this.setState({
            firstName: result.data.users_first_name,
            lastName: result.data.users_last_name,
            image: result.data.users_image,
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        let body = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            image: this.state.image,
        }

        const token = JSON.parse(localStorage.getItem('access-token'));
        const payload = await jwt.decode(token);
        const result = await appFetch('PUT', '/user/profil/' + payload.userId, body);

        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace("/Accueil");
            } else {
                this.props.history.replace(`/error?code=${result.status}`);
            }
            return;
        }

        this.setState({
            email: result.data.users_email,
            firstName: result.data.users_first_name,
            lastName: result.data.users_last_name,
            image: result.data.users_image,

            changeName: false,
        })

        // Gérer la mise en page en cas de succès (changeName)
    }

    render() {
        return (
            this.state.display ?
                (
                    <Layout auth>
                        <div className="container_profil">
                            <div className="container_profil_img">
                                {this.state.image !== "" ?
                                    <img src={'http://localhost:3000/public/uploads/' + this.state.image} />
                                    :
                                    <span>pas d'image</span>}
                                {this.state.changeName &&
                                    <>
                                        <label for="file" class="label-file">Choisir une image</label>
                                        <input id="file" class="input-file" type="file" onChange={this.handleChangeImage}></input>
                                    </>
                                }
                            </div>

                            <div className="container_profil_p">
                                <div className="profil_p">
                                    <p>Email : {this.state.email}</p>
                                </div>
                                <div className="profil_p">
                                    {this.state.changeName ? <input value={this.state.lastName} onChange={this.handleChangeLastName}></input> : <p>Nom de famille : {this.state.lastName}</p>}
                                </div>
                                <div className="profil_p">
                                    {this.state.changeName ? <input value={this.state.firstName} onChange={this.handleChangeFirstName}></input> : <p>Prénom : {this.state.firstName} </p>}
                                </div>
                                <div className="profil_p">
                                    <p> Date de création du profil : {this.state.createdDate}</p>
                                </div>
                            </div>
                            <div className="container_profil_button">
                                {this.state.changeName ? <button onClick={this.handleCancel}>Annuler</button> : <button onClick={this.handleDeleteProfile}>Supprimer</button>}
                                {this.state.changeName ? <button onClick={this.handleSubmit}>Envoyer</button> : <button onClick={this.handleName}>Changer</button>}
                            </div>
                        </div>
                    </Layout>
                ) : null
        )
    }
}
export default Profil;

