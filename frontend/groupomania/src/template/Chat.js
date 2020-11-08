import React from 'react';
import { appFetch } from '../appFetch/appFetch';
import Layout from './layout';

//Composant de la page du forum

class Chat extends React.Component {

    constructor(props) {
        super(props);

        //valeur booléenne, qui sert a définir si le composant doit s'afficher ou non en fonction de la réponse du serveur
        this.state = {
            display: false,
            displayMsg: false,
            titleMsg: "",
            message: "",
        }

        this.handleDisplayMsg = this.handleDisplayMsg.bind(this);
        this.handleTitleMsg = this.handleTitleMsg.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    //fonction handleFetchErrors qui redirige l'utilisateur vers une page d'erreur, en fonction de la réponse serveur à l'aide de "props.history"
    //https://reactrouter.com/web/api/history

    handleFetchErrors(errStatus) {
        switch (errStatus) {
            case 404: this.props.history.replace('/error?code=404'); break;
            case 200: break;
            default: this.props.history.replace('/error?code=500'); break;
        }
    }

    handleDisplayMsg() {
        this.setState({ displayMsg: true })
    }

    handleTitleMsg(e) {
        this.setState({ titleMsg: e.target.value })
    }

    handleMessage(e) {
        this.setState({ message: e.target.value })
    }

    handleSubmit(e) {
        this.setState({

        })
    }

    //Dans la fonction componentDidMount(fonction native react pour le cycle de vie) 
    async componentDidMount() {
        //On fait un appel fetch de type post pour que le serveur vérifie l'identité de l'utilisateur
        const result = await appFetch('POST', '/user/auth');


        if (result.status !== 200) {
            if (result.status === 401) {
                //en cas d'erreur 401 on renvois l'utilisateur vers l'accueil
                this.props.history.replace("/Accueil");
            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                this.props.history.replace(`/error?code=${result.status}`);
            }
            return;
        }

        console.log("OK, pas d'erreur");
        //si l'utilisateur est autorisé, on affiche le composant chat
        this.setState({ display: true });
    }

    render() {
        return (
            this.state.display ?
                (
                    <Layout auth>
                        <div className="container_chat">
                            {this.state.displayMsg ? <button className="chat">Votre message</button> : <button onClick={this.handleDisplayMsg} className="chat">Poster un nouveaux message</button>}
                            <div className="container_message">
                                {this.state.displayMsg ? <FormChat /> : <ChatMessage />}
                            </div>
                        </div>
                    </Layout>
                )
                :
                null
        )
    }
}

class FormChat extends Chat {
    render() {
        return (
            <div className="container_form_chat">
                <div className="title_message">
                    <label>Titre du message</label>
                    <input value={this.state.titleMsg} onChange={this.handleTitleMsg}></input>
                </div>
                <div className="message">
                    <label>Votre message</label>
                    <textarea value={this.state.message} onChange={this.handleMessage}></textarea>
                </div>
                <button className="Send_message" onClick={this.handleSubmit}>Envoyer</button>
            </div>
        )
    }
}

class ChatMessage extends Chat {
    render() {
        return (
            <p>ici les messages présent sur le forum</p>
        )
    }
}

export default Chat;