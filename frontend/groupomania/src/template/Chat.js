import React from 'react';
import { appFetch } from '../appFetch/appFetch';
import Layout from './layout';
import jwt from 'jsonwebtoken';

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
            formMsgImage: "",
            messageList: [],
            messagePut: null,
            messagePutContent: "",
            comment: "",
            replyIndex: null,
            // deletePostIndex: null,
            displayCommentsList: [],
            changeBtnComment: [],

        }

        this.handleDisplayMsg = this.handleDisplayMsg.bind(this);
        this.handleFormMsgTitle = this.handleFormMsgTitle.bind(this);
        this.handleFormMsgContent = this.handleFormMsgContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePutMsg = this.handlePutMsg.bind(this);
        this.handleMessagePutContent = this.handleMessagePutContent.bind(this);
        this.handleSubmitPutMsg = this.handleSubmitPutMsg.bind(this);
        this.handleFormComment = this.handleFormComment.bind(this);
        this.renderFormComment = this.renderFormComment.bind(this);
        this.handlePostComment = this.handlePostComment.bind(this);
        this.handleGetComment = this.handleGetComment.bind(this);
        this.handleCancelComment = this.handleCancelComment.bind(this);
        this.handleBtnDisplayComment = this.handleBtnDisplayComment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handlePutComment = this.handlePutComment.bind(this);
        this.handleSendPutComment = this.handleSendPutComment.bind(this);

        // this.refreshComments = this.refreshComments.bind(this);
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
                    <button className="post_img">Choisir une image</button>
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
                                <div className="btn_post_content">
                                    <h2>{element.msg_title}</h2>
                                    {this.state.messagePut !== index ?
                                        <button onClick={e => this.handlePutMsg(e, index)}>modifier</button>
                                        :
                                        <button onClick={e => this.handleSubmitPutMsg(e, element.msg_id)}>envoyer</button>
                                    }
                                    {/* <button onClick={e => this.handleDeleteMsg(e)}>supprimer</button> */}
                                </div>
                                {this.state.messagePut === index ?
                                    <div className="element_post_content">
                                        <textarea value={this.state.messagePutContent} onChange={this.handleMessagePutContent}></textarea>
                                    </div>
                                    :
                                    <div className="element_post_content">
                                        <p>{element.msg_content}</p>
                                    </div>}
                            </div>
                            <div className="container_comment_post">
                                {this.state.replyIndex === index ?
                                    //le balisage permet d'insérer plusieur éléments dans la fonction ternaire
                                    <>
                                        <button value={index} onClick={e => this.handleCancelComment(e, element.msg_id)}>Annuler</button>
                                        <button
                                            className={this.state.comment === "" ? "btn-disabled" : ""}
                                            //disabled = propriétée booleénne, on peut me mettre une condition qui retourne un boolean
                                            disabled={this.state.comment === ""}
                                            value={index}
                                            // onClick attend une fonction, donc on lui donne une fonction fléchée pour pouvoir ajouter notre argument en second ensuite
                                            onClick={e => this.handlePostComment(e, element.msg_id)}
                                        > Poster votre commentaire </button>
                                    </>
                                    :
                                    <>
                                        <button onClick={e => this.handleFormComment(e, index)}>Laissez un commentaire</button>
                                        {this.state.messageList[index].comments.length > 0 &&
                                            <button onClick={e => this.handleBtnDisplayComment(e, index)}>
                                                {!this.state.displayCommentsList.includes(index) ?
                                                    "Afficher les commentaires"
                                                    :
                                                    "Masquer les commentaires"}
                                            </button>
                                        }
                                    </>
                                }
                                {this.state.replyIndex === index ?
                                    <div value={index}>{this.renderFormComment()}</div>
                                    :
                                    // (this.state.btnDisplayComment == true && this.state.replyIndexComment === index) ?
                                    // (this.state.btnDisplayComment === true) ?
                                    this.state.displayCommentsList.includes(index) ?

                                        <div className="container_comments" value={index}>{this.renderComments(element.comments, index)}</div>
                                        :
                                        <div className="container_comments" value={index}></div>
                                }
                            </div>
                        </div>
                    );
                })}
            </>
        )
    }

    handleMessagePutContent(e) {
        this.setState({
            messagePutContent: e.target.value,
        })
    }

    async handleSubmitPutMsg(e, postId) {
        e.preventDefault();

        let body = {
            postId: postId,
            messagePutContent: this.state.messagePutContent,
        }
        const token = await JSON.parse(localStorage.getItem('access-token'));
        const payload = await jwt.decode(token);

        //fetch
        const result = await appFetch('PUT', '/message/' + payload.userId, body);
        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace(`/error?code=${result.status}`);

            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                alert(`une erreur est survenue (code: ${result.status})`)
            }
            return;
        }

        this.setState({
            messagePut: null,
        })

    }

    handlePutMsg(e, index) {
        e.preventDefault();

        this.setState({
            messagePut: index,
        })
    }

    handleBtnDisplayComment(e, index) {
        e.preventDefault();

        let displayCommentsList = this.state.displayCommentsList;

        if (!displayCommentsList.includes(index)) {
            // ajout
            displayCommentsList.push(index)
        } else {
            // retirer
            displayCommentsList = displayCommentsList.filter(value => value !== index);
        }
        // console.log("displayCommentsList", displayCommentsList);

        this.setState({ displayCommentsList });

    }

    async handleCancelComment(e, postId) {
        e.preventDefault();

        const result = await appFetch('GET', '/message/comments/' + postId);
        if (result.status === 200) {
            this.refreshComments(this.state.replyIndex, result.data);
        }

        // console.log("after console", result);

        this.setState({
            replyIndex: null,
            comment: "",
        });
    }

    async handlePostComment(e, postId) {
        e.preventDefault();
        let body = {
            commentContent: this.state.comment,
            postId,
        }

        //fetch qui envois les infos à la bdd
        const result = await appFetch('POST', '/comment', body);
        console.log(result);

        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace(`/error?code=${result.status}`);

            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                alert(`une erreur est survenue (code: ${result.status})`)
            }
            return;
        }


        // Fetcher les commentaires pour les rafraîchir
        const resultComments = await appFetch('GET', '/message/comments/' + postId);
        if (resultComments.status === 200) {
            this.refreshComments(this.state.replyIndex, resultComments.data);
        } else {
            alert("Un problème est survenu. Veuillez rafraîchir la page.");
        }


        this.setState({
            replyIndex: null,
            comment: "",
        });

        console.log("OK, pas d'erreur");
        // this.setState({ displayComment: true })

    }

    refreshComments(postId, newComments) {
        const messageList = this.state.messageList;
        messageList[postId].comments = newComments;
        this.setState({ messageList });
    }


    handleFormComment(e, index) {
        e.preventDefault(e);
        this.setState({
            replyIndex: index,
        })
        // console.log(this.state.replyIndex);
    }

    renderFormComment() {
        return (
            <div className="container_txt_area_comment">
                <textarea value={this.state.comment} onChange={this.handleGetComment}></textarea>
            </div>
        )
    }

    renderComments(comments, messageIndex) {
        return (
            <div>
                {comments.map((element, index) => {

                    // condition if/else avec deux return
                    // si element.comment_id === this.state.editCommentId (à créer) => return un textarea avec le texte du message (à stocker dans une valeur de state temporaire this.state.editCommentContent)
                    // sinon, return ce qui est déjà là

                    return (
                        <>
                            <div className="container_user_comment" key={index}>
                                <div>
                                    <p className="user_comment">commentaire de {element.users_first_name} {element.users_last_name}</p>
                                    {/* {this.state} */}
                                    <p className="comment">{element.comment_content}</p>
                                </div>
                                <button className="btn_delete_comment" value={element.comment_id} onClick={e => this.handleDeleteComment(e, element.comment_id, element.comment_post_id, messageIndex)}> x </button>
                                {this.state.changeBtnComment.includes(element.comment_id) ?
                                    <button className="btn_change_comment" onClick={e => this.handleSendPutComment(e, element.comment_id)}> Envoyer </button>
                                    :
                                    <button className="btn_change_comment" onClick={e => this.handlePutComment(e, element.comment_id)}> Modifier </button>
                                }
                            </div>
                        </>
                    )
                })}
            </div>
        )
    }

    handlePutComment(e, commentId) {
        e.preventDefault();

        let changeBtnComment = this.state.changeBtnComment;

        changeBtnComment.push(commentId);

        this.setState({ changeBtnComment, });

        console.log(changeBtnComment);

    }

    async handleSendPutComment(e, commentId) {
        e.preventDefault();

        // let body = {
        //     commentId: e.target.value,
        //     comment: "",
        //     commentDate: "",
        // }

        // const result = await appFetch('PUT', '/comment', body);
        // console.log(result);

        // if (result.status !== 200) {
        //     if (result.status === 401) {
        //         this.props.history.replace(`/error?code=${result.status}`);

        //     } else {
        //         //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
        //         alert(`une erreur est survenue (code: ${result.status})`)
        //     }
        //     return;
        // }

        let changeBtnComment = this.state.changeBtnComment;

        changeBtnComment = changeBtnComment.filter(value => value !== commentId);

        this.setState({
            changeBtnComment,
        })

    }

    async handleDeleteComment(e, commentId, postId, messageIndex) {// messageIndex et utilisé pour rafraichir la bonne liste de commentaire
        e.preventDefault();


        const result = await appFetch('DELETE', `/comment/${commentId}`, {});
        console.log(result);

        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace(`/error?code=${result.status}`);

            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                alert(`une erreur est survenue (code: ${result.status})`)
            }
            return;
        }

        // Fetcher les commentaires pour les rafraîchir
        const resultComments = await appFetch('GET', '/message/comments/' + postId);

        console.log("resultComments", resultComments);

        if (resultComments.status === 200) {
            this.refreshComments(messageIndex, resultComments.data);
        } else {
            alert("Un problème est survenu. Veuillez rafraîchir la page.");
        }


        // this.setState({
        //     // deletePostIndex: null,
        //     // comment: "",
        // });

        console.log("OK, pas d'erreur");
        this.setState({ displayComment: true })

    }

    handleGetComment(e) {
        e.preventDefault();
        this.setState({ comment: e.target.value })
    }

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