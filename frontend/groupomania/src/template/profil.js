import React from 'react';
import Layout from './layout';
import { appFetch } from '../appFetch/appFetch';
import jwt from 'jsonwebtoken';

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

            // redirection: false,
        }

        this.handleName = this.handleName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const token = JSON.parse(localStorage.getItem('access-token'));
        const payload = await jwt.decode(token);
        console.log("111", payload)
        console.log("222", payload.userId)


        const result = await appFetch('GET', '/user/profil/' + payload.userId);
        console.log(result.data.users_email);


        // users_created_date: "2020-10-30T13:44:12.000Z"
        // users_email: "ggg@gmail.com"
        // users_first_name: "ggg"
        // users_last_name: "ggg"


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
        });

    }

    // handleSubmit(){
    //     this.setState({
    //         display: true,
    //         email: ,
    //         firstName: ,
    //         lastName: ,
    //         createdDate: ,
    //     });
    // }

    handleName() {
        this.setState({ changeName: true })
    }

    handleChangeLastName(e) {
        this.setState({ lastName: e.target.value })
    }

    handleChangeFirstName(e) {
        this.setState({ firstName: e.target.value })
    }

    async handleSubmit(e) {
        e.preventDefault();

        let body = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
        }

        const token = JSON.parse(localStorage.getItem('access-token'));
        const payload = await jwt.decode(token);
        const result = await appFetch('PUT', '/user/profil/' + payload.userId, body);
        // const result = await appFetch('PUT', '/user/profil/1', body);


        console.log(result);


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
            changeName: false,
        })

        // Gérer la mise en page en cas de succès (changeName)
    }

    render() {
        return (
            this.state.display ?
                (
                    <Layout>
                        <div className="container_profil">
                            <div className="container_profil_img">
                            </div>
                            <div className="container_profil_p">
                                <p>{this.state.email}</p>
                            </div>
                            <div className="container_profil_p">
                                {this.state.changeName ? <input value={this.state.lastName} onChange={this.handleChangeLastName}></input> : <p>{this.state.lastName}</p>}
                            </div>
                            <div className="container_profil_p">
                                {this.state.changeName ? <input value={this.state.firstName} onChange={this.handleChangeFirstName}></input> : <p>{this.state.firstName}</p>}
                            </div>
                            <div className="container_profil_p">
                                <p>{this.state.createdDate}</p>
                            </div>

                            <div className="container_profil_button">
                                {this.state.changeName ? <button onClick={this.handleSubmit}>Envoyer</button> : <button onClick={this.handleName}>Changer</button>}
                            </div>
                        </div>
                    </Layout>
                ) : null
        )
    }
}
export default Profil;


// dans didMount, setState où on met email, firstName, etc... 
// dans render, afficher les valeurs
//      email et createdDate en lecture
//      firstName et lastName : input
// bouton modifier => handleSubmit

// route put, AUTH!!!, avec :id en paramètre
// composer une requête SQL UPDATE pour changer firstName et lastName
// gérer les réponses (alerte)

