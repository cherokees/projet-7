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
            formMsgTitle: "",
            formMsgContent: "",
            messageList: [],
            comment: "",
            replyIndex: null,
        }

        this.handleDisplayMsg = this.handleDisplayMsg.bind(this);
        this.handleFormMsgTitle = this.handleFormMsgTitle.bind(this);
        this.handleFormMsgContent = this.handleFormMsgContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormComment = this.handleFormComment.bind(this);
        this.renderFormComment = this.renderFormComment.bind(this);
        this.handlePostComment = this.handlePostComment.bind(this);
        this.handleGetComment = this.handleGetComment.bind(this);
    }

    //Dans la fonction componentDidMount(fonction native react pour le cycle de vie) 
    async componentDidMount() {
        //On fait un appel fetch de type get pour que le serveur vérifie l'identité de l'utilisateur
        // const result = await appFetch('GET', '/user/auth');

        const result = await appFetch('GET', '/message');


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

        // Cette partie de code se déclenche si l'utilisateur est connecté
        console.log(result);

        // load msg
        // state

        //si l'utilisateur est autorisé, on affiche le composant chat
        this.setState({ display: true, messageList: result.data });
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

    handleFormMsgTitle(e) {
        this.setState({ formMsgTitle: e.target.value })
    }

    handleFormMsgContent(e) {
        this.setState({ formMsgContent: e.target.value })
    }

    async handleSubmit(e) {

        let body = {
            titleMsg: this.state.formMsgTitle,
            message: this.state.formMsgContent,
        }

        //fetch qui envois les infos à la bdd
        //si réussite on repasse displayMsg à false
        const result = await appFetch('POST', '/message', body);


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
        this.setState({ displayMsg: false });
    }

    renderForm() {
        return (
            <div className="container_form_chat">
                <div className="title_message">
                    <label>Titre du message</label>
                    <input value={this.state.formMsgTitle} onChange={this.handleFormMsgTitle}></input>
                </div>
                <div className="message">
                    <label>Votre message</label>
                    <textarea value={this.state.formMsgContent} onChange={this.handleFormMsgContent}></textarea>
                </div>
                <button className="Send_message" onClick={this.handleSubmit}>Envoyer</button>
            </div>
        )
    }

    renderMessagesList() {
        return (
            <>
                {/* <a id="section1" href="#section2" className="button_bas_page">Bas de page</a> */}
                {this.state.messageList.map((element, index) => {
                    return (
                        <div className="message_post" key={index}>

                            <div className="message_post_user">
                                <p>{element.users_first_name}</p>
                                <p>{element.users_last_name}</p>
                                <p className="message_post_date">{element.msg_date}</p>
                            </div>
                            <div className="message_post_content">
                                <h2>{element.msg_title}</h2>
                                <p>{element.msg_content}</p>
                            </div>
                            <div className="btn_comment_post">
                                {this.state.replyIndex == index ?
                                    // onClick attend une fonction, donc on lui donne une fonction fléchée pour pouvoir ajouter notre argument en second ensuite
                                    <button value={index} onClick={e => this.handlePostComment(e, element.msg_id)}>Poster votre commentaire</button> :
                                    <button value={index} onClick={this.handleFormComment}>Laissez un commentaire</button>
                                }
                                {this.state.replyIndex == index ?
                                    <div value={index}>{this.renderFormComment()}</div> :
                                    <div value={index}>{this.renderComments(element.comments)}</div>
                                }
                            </div>
                        </div>
                    );
                })}
            </>
        )
    }

    //button commentaire --> boolean (créez/poster)
    //en fonction du boolean --> faire apparaitre areaTexte ou <p>
    //lié les commentaires au compte
    //chargé les commentaires en même temps que les messages
    //les msg doivent resté même si le compte est effacé

    async handlePostComment(e, postId) {
        e.preventDefault();
        let body = {
            commentContent: this.state.comment,
            postId,
        }

        //fetch qui envois les infos à la bdd
        //si réussite on repasse displayMsg à false
        const result = await appFetch('POST', '/comment', body);


        if (result.status !== 200) {
            if (result.status === 401) {

                console.log('une erreur 401');
                //en cas d'erreur 401 on renvois l'utilisateur vers l'accueil
                // this.props.history.replace("/Accueil");
            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                this.props.history.replace(`/error?code=${result.status}`);
            }
            return;
        }


        // retour des commentaires du message : result.data

        // const messageList = this.state.messageList;

        // messageList[this.state.replyIndex].comments = result.data;

        // this.setState({ messageList });





        this.setState({
            replyIndex: null,
        });

        console.log("OK, pas d'erreur");
        // this.setState({ displayComment: true })

    }


    handleFormComment(e) {
        e.preventDefault(e);
        this.setState({
            replyIndex: e.target.value,
        })
    }

    renderFormComment() {
        return (
            <div className="container_txt_area_comment">
                <textarea value={this.state.comment} onChange={this.handleGetComment}></textarea>
            </div>
        )
    }

    renderComments(comments) {
        return (
            <div>
                {comments.map((element, index) => {
                    return (
                        <div key={index}>
                            <p>{element.comment_content}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

    handleGetComment(e) {
        e.preventDefault();
        this.setState({ comment: e.target.value })
    }

    // async handleFormCommentSubmit() {
    //     console.log(this.state.msg_id);
    //     let body = {
    //         commentContent: this.state.comment,
    //         // postId: ,
    //     }

    //     //fetch qui envois les infos à la bdd
    //     //si réussite on repasse displayMsg à false
    //     const result = await appFetch('POST', '/comment', body);


    //     if (result.status !== 200) {
    //         if (result.status === 401) {

    //             console.log('une erreur 401');
    //             //en cas d'erreur 401 on renvois l'utilisateur vers l'accueil
    //             // this.props.history.replace("/Accueil");
    //         } else {
    //             //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
    //             this.props.history.replace(`/error?code=${result.status}`);
    //         }
    //         return;
    //     }

    //     console.log("OK, pas d'erreur");
    //     // this.setState({ displayComment: true })

    // }

    render() {
        return (
            this.state.display ?
                (
                    <Layout auth>
                        <div className="container_chat">
                            <div className="banner_chat">
                                {this.state.displayMsg ? <button className="button_chat">Votre message</button> : <button onClick={this.handleDisplayMsg} className="button_chat">Poster un nouveaux message</button>}
                            </div>
                            <div className="container_message">
                                {this.state.displayMsg ? this.renderForm() : this.renderMessagesList()}
                            </div>
                        </div>
                    </Layout>
                )
                :
                null
        )
    }
}

export default Chat;