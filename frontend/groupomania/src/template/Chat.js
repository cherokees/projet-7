import React from 'react';
import { appFetch } from '../utils/appFetch';
import Layout from './layout';
import jwt from 'jsonwebtoken';
import { uploadFile } from '../utils/upload';
import Linkify from 'react-linkify';
import { FaPen } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { BsBackspace } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Scrollbars from 'react-scrollbars-custom';
import { AutoSizer } from "react-virtualized";



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
            image: "",
            messageList: [],
            messagePut: null,
            messagePutContent: "",
            comment: "",
            replyIndex: null,
            displayCommentsList: [],
            changeBtnComment: [],
            editCommentContent: "",
            searchMsg: "john doe",
            user: "",
            userMessageList: [],
            displaySearch: false,
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
        this.handleEditCommentContent = this.handleEditCommentContent.bind(this);
        this.handleChangeSearchMsg = this.handleChangeSearchMsg.bind(this);
        this.handlePostSearchMsg = this.handlePostSearchMsg.bind(this);
        this.handleCancelMsg = this.handleCancelMsg.bind(this);
        this.handleCancelSearchMsg = this.handleCancelSearchMsg.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.checkIdentity = this.checkIdentity.bind(this);
        this.handleDeleteMsg = this.handleDeleteMsg.bind(this);
    }

    //Dans la fonction componentDidMount(fonction native react pour le cycle de vie) 
    async componentDidMount() {
        //On fait un appel fetch de type get pour que le serveur vérifie l'identité de l'utilisateur
        // const result = await appFetch('GET', '/user/auth');

        const result = await appFetch('GET', '/message');
        // const resultImage = await appFetch('POST', '/user/')

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

        const token = await JSON.parse(localStorage.getItem('access-token'));
        const payload = await jwt.decode(token);

        //si l'utilisateur est autorisé, on affiche le composant chat
        this.setState({
            display: true,
            messageList: result.data,
            user: payload.userId,
            userRole: payload.role,
        });
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

    checkIdentity(checkId) {
        return (this.state.user === checkId || this.state.userRole === 1)

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
        e.preventDefault();

        let body = {
            titleMsg: this.state.formMsgTitle,
            message: this.state.formMsgContent,
            image: this.state.image,
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

        //si l'utilisateur est autorisé, on affiche le composant chat
        this.setState({
            messageList: result.data,
            displayMsg: false,
            image: "",
            titleMsg: "",
            message: "",
        });
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
                    <div className="message_style">
                        <label for="file" class="label-file">Choisir une image</label>
                        <input id="file" class="input-file" type="file" onChange={this.handleChangeImage}></input>
                        {this.state.image && <img className="img_file" src={'http://localhost:3000/public/uploads/' + this.state.image} />}
                    </div>
                </div>
                <button className="Send_message" onClick={this.handleSubmit}>Envoyer</button>
            </div>
        )
    }

    convertDate(paraStr) {
        paraStr = paraStr.split("T");
        let date = paraStr[0];
        let horaire = paraStr[1].split(".");
        horaire = horaire[0];

        horaire = horaire.split(":");
        let time = horaire[0];
        let minute = horaire[1];
        let second = horaire[2];

        date = date.split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2];

        return ("posté le " + day + "-" + month + "-" + year + " " + "à " + time + "h " + minute + "mn ");
    };


    renderMessagesList() {

        if (this.state.messageList.length === 0) {
            return (
                <p>Aucun résultat trouvé</p>
            );
        } else {

            return (
                <>
                    <AutoSizer>
                        {({ width, height }) => {
                            return (
                                <Scrollbars style={{ width, height }}>

                                    {/* <a id="section1" href="#section2" className="button_bas_page">Bas de page</a> */}
                                    {this.state.messageList.map((element, index) => {
                                        return (
                                            <div className="message_post" key={index}>

                                                <div className="message_post_user">
                                                    <img className="img_profil" src={'http://localhost:3000/public/uploads/' + element.users_image} />
                                                    <p className="message_post_name">{element.users_first_name} {element.users_last_name}</p>
                                                    <p className="message_post_date">{this.convertDate(element.msg_date)}</p>
                                                </div>
                                                <div className="message_post_content">
                                                    <div className="btn_post_content">
                                                        <h2>{element.msg_title}</h2>
                                                        {(this.checkIdentity(element.msg_user_id) && element.msg_content !== null) ?
                                                            this.state.messagePut !== index ?
                                                                <>
                                                                    <button onClick={e => this.handlePutMsg(e, index, element.msg_content, element.msg_image)}><FaPen /></button>
                                                                    <button onClick={e => this.handleDeleteMsg(e, element.msg_id, element.msg_user_id, index)}><MdDelete /></button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button onClick={e => this.handleSubmitPutMsg(e, element.msg_id, element.msg_user_id, index)}><BiMailSend /></button>
                                                                    <button onClick={e => this.handleCancelPutMsg(e)}><BsBackspace /></button>
                                                                </>
                                                            :
                                                            null
                                                        }
                                                        {/* <button onClick={e => this.handleDeleteMsg(e)}>supprimer</button> */}
                                                    </div>
                                                    {this.state.messagePut === index ?
                                                        <div className="element_post_content">
                                                            {this.state.image && <img src={'http://localhost:3000/public/uploads/' + this.state.image} />}
                                                            <div className="container_style_post_img">
                                                                {/* <input
                                                                    className="image_url"
                                                                    name="image"
                                                                    type="file"
                                                                    accept=".jpg"
                                                                    onChange={this.handleChangeImage}>
                                                                </input> */}
                                                                <label for="file" class="label-file">Choisir une image</label>
                                                                <input id="file" class="input-file" type="file" onChange={this.handleChangeImage}></input>
                                                                <textarea value={this.state.messagePutContent} onChange={this.handleMessagePutContent}></textarea>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="element_post_content">
                                                            <Linkify>
                                                                <p>{element.msg_content === null ? "Message supprimé" : element.msg_content}</p>
                                                            </Linkify>
                                                            {element.msg_image &&
                                                                <img src={'http://localhost:3000/public/uploads/' + element.msg_image} />}
                                                        </div>}
                                                </div>
                                                <div className="container_comment_post">
                                                    {this.state.replyIndex === index ?
                                                        //le balisage permet d'insérer plusieur éléments dans la fonction ternaire
                                                        <>
                                                            <button value={index} onClick={e => this.handleCancelComment(e, element.msg_id)}><BsBackspace /></button>
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
                                </Scrollbars>
                            );
                        }}
                    </AutoSizer>
                </>
            )
        }




    }

    async handleDeleteMsg(e, postId, userId, postIndex) {
        e.preventDefault();

        let body = {
            postId,
        }

        const result = await appFetch('PUT', `/message/disable/` + userId, body);

        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace(`/error?code=${result.status}`);

            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                alert(`une erreur est survenue (code: ${result.status})`)
            }
            return;
        }

        this.refreshMessage(postIndex, result.data);

    }

    handleCancelPutMsg(e) {
        e.preventDefault();

        this.setState({
            messagePut: null,
        })
    }

    handleMessagePutContent(e) {
        this.setState({
            messagePutContent: e.target.value,
        })
    }

    async handleSubmitPutMsg(e, postId, postUserId, postIndex) {
        e.preventDefault();

        let body = {
            postId: postId,
            messagePutContent: this.state.messagePutContent,
            image: this.state.image,
        }
        // const token = await JSON.parse(localStorage.getItem('access-token'));
        // const payload = await jwt.decode(token);

        //fetch
        const result = await appFetch('PUT', '/message/' + postUserId, body);

        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace(`/error?code=${result.status}`);

            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                alert(`une erreur est survenue (code: ${result.status})`)
            }
            return;
        }

        this.refreshMessage(postIndex, result.data);

        this.setState({
            messagePut: null,
        })

    }

    handlePutMsg(e, index, message, image) {
        e.preventDefault();

        this.setState({
            messagePut: index,
            messagePutContent: message,
            image: image,
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

        this.setState({ displayCommentsList });

    }

    async handleCancelComment(e, postId) {
        e.preventDefault();

        const result = await appFetch('GET', '/message/comments/' + postId);
        if (result.status === 200) {
            this.refreshComments(this.state.replyIndex, result.data);
        }

        this.setState({
            replyIndex: null,
            comment: "",
        });
    }

    async handlePostComment(e, postId) {
        e.preventDefault();
        let body = {
            commentContent: this.state.comment,
            image: this.state.image,
            postId,
        }

        //fetch qui envois les infos à la bdd
        const result = await appFetch('POST', '/comment', body);

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
            image: "",
        });

        // this.setState({displayComment: true })

    }

    refreshMessage(postIndex, newMessage) {
        const messageList = this.state.messageList;
        const oldComments = messageList[postIndex].comments;
        messageList[postIndex] = newMessage;
        messageList[postIndex].comments = oldComments;
        this.setState({ messageList });
    }

    refreshComments(postIndex, newComments) {
        const messageList = this.state.messageList;
        messageList[postIndex].comments = newComments;
        this.setState({ messageList });
    }


    handleFormComment(e, index) {
        e.preventDefault(e);
        this.setState({
            replyIndex: index,
        })
    }

    renderFormComment() {
        return (
            <div className="container_txt_area_comment">
                <textarea value={this.state.comment} onChange={this.handleGetComment}></textarea>
                <div className="container_flex_comment_img">
                    <label for="file" class="label-file">Choisir une image</label>
                    <input id="file" class="input-file" type="file" onChange={this.handleChangeImage}></input>
                    {this.state.image && <img className="img_file" src={'http://localhost:3000/public/uploads/' + this.state.image} />}
                </div>
            </div>
        )
    }

    async handleChangeImage(e) {
        e.preventDefault();

        const file = Array.from(e.target.files)[0];

        if (file) {

            const result = await uploadFile("/upload/image", file);
            this.setState({ image: result.data });
        } else {
            console.log("PAS DIMAGE");
            this.setState({ image: "" }); // ELEVER LE ELSE ET UTILISER CETTE LIGNE DANS UN handeDeleteImage
        }
    }

    renderComments(comments, messageIndex) {
        return (
            <div>
                {comments.map((element, index) => {

                    if (this.state.changeBtnComment.includes(element.comment_id)) {
                        return (
                            <div className="container_user_comment" key={index}>
                                <div className="container_style_img_comment">
                                    {this.state.image && <img src={'http://localhost:3000/public/uploads/' + this.state.image} />}
                                    {/* <input
                                    className="image_url"
                                    name="image"
                                    type="file"
                                    accept=".jpg"
                                    onChange={this.handleChangeImage}>
                                </input> */}
                                    <label for="file" class="label-file">Choisir une image</label>
                                    <input id="file" class="input-file" type="file" onChange={this.handleChangeImage}></input>
                                </div>
                                <textarea value={this.state.editCommentContent} onChange={e => this.handleEditCommentContent(e)}></textarea>
                                {this.state.changeBtnComment.includes(element.comment_id) ?
                                    <div className="container_btn_change_comment">
                                        <button className="btn_change_comment" onClick={e => this.handleSendPutComment(e, element.comment_id, element.comment_user_id, element.comment_post_id, messageIndex)}><BiMailSend /></button>
                                        <button className="btn_cancel_display_comment" onClick={e => this.handleChangePutDisplayComment(e, element.comment_id)}><BsBackspace /></button>
                                    </div>
                                    :
                                    <button className="btn_change_comment" onClick={e => this.handlePutComment(e, element.comment_id)}><FaPen /> </button>
                                }
                            </div>
                        )
                    } else

                        return (
                            <>
                                <div className="container_user_comment" key={index}>
                                    <div>
                                        <p className="user_comment">{element.users_first_name} {element.users_last_name}</p>
                                        {element.comment_image &&
                                            <img src={'http://localhost:3000/public/uploads/' + element.comment_image} />
                                        }
                                        <Linkify>
                                            <p className="comment">{element.comment_content === null ? "Commentaire supprimé" : element.comment_content}</p>
                                        </Linkify>
                                    </div>
                                    <div className="container_btn_style">
                                        {/* {(this.state.user === element.comment_user_id || this.checkIdentity(element.msg_user_id) && element.comment_content !== null) ? */}
                                        {(this.checkIdentity(element.comment_user_id) && element.comment_content !== null) ?
                                            // {(this.state.user === element.comment_user_id && element.comment_content !== null) ?
                                            <>
                                                <button className="btn_delete_comment"
                                                    value={element.comment_id}
                                                    onClick={e => this.handleDeleteComment(e, element.comment_id, element.comment_post_id, messageIndex, element.comment_user_id)}><MdDelete /> </button>
                                                {this.state.changeBtnComment.includes(element.comment_id) ?
                                                    <>
                                                        <button className="btn_change_comment" onClick={e => this.handleSendPutComment(e, element.comment_id)}><BiMailSend /></button>
                                                    </>
                                                    :
                                                    <button className="btn_change_comment" onClick={e => this.handlePutComment(e, element.comment_id, element.comment_content, element.comment_image)}><FaPen /></button>
                                                }
                                            </>
                                            :
                                            <div></div>

                                        }
                                    </div>

                                </div>
                            </>
                        )
                })}
            </div>
        )
    }

    handleChangePutDisplayComment(e, commentId) {
        e.preventDefault();

        let changeBtnComment = this.state.changeBtnComment;

        changeBtnComment = changeBtnComment.filter(value => value !== commentId);

        this.setState({ changeBtnComment, })
    }

    handleEditCommentContent(e) {
        e.preventDefault();

        this.setState({
            editCommentContent: e.target.value,
        })

    }

    handlePutComment(e, commentId, commentContent, commentImage) {
        e.preventDefault();

        let changeBtnComment = this.state.changeBtnComment;

        changeBtnComment.push(commentId);

        this.setState({
            changeBtnComment,
            editCommentContent: commentContent,
            image: commentImage,
        });
    }

    async handleSendPutComment(e, commentId, commentUserId, postId, messageIndex) {
        e.preventDefault();

        let body = {
            commentId: commentId,
            comment: this.state.editCommentContent,
            image: this.state.image,
        }

        // const token = await JSON.parse(localStorage.getItem('access-token'));
        // const payload = await jwt.decode(token);

        const result = await appFetch('PUT', '/comment/' + commentUserId, body);

        if (result.status !== 200) {
            if (result.status === 401) {
                this.props.history.replace(`/error?code=${result.status}`);

            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                alert(`une erreur est survenue (code: ${result.status})`)
            }
            return;
        }

        const resultComments = await appFetch('GET', '/message/comments/' + postId);

        if (resultComments.status === 200) {
            this.refreshComments(messageIndex, resultComments.data);
        } else {
            alert("Un problème est survenu. Veuillez rafraîchir la page.");
        }

        let changeBtnComment = this.state.changeBtnComment;

        changeBtnComment = changeBtnComment.filter(value => value !== commentId);

        this.setState({
            changeBtnComment,
            image: "",
        })

    }

    async handleDeleteComment(e, commentId, postId, messageIndex, userId) {// messageIndex et utilisé pour rafraichir la bonne liste de commentaire
        e.preventDefault();

        let body = {
            commentId,
        }

        const result = await appFetch('PUT', `/comment/disable/` + userId, body);

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
            this.refreshComments(messageIndex, resultComments.data);
        } else {
            alert("Un problème est survenu. Veuillez rafraîchir la page.");
        }


        // this.setState({
        //     // deletePostIndex: null,
        //     // comment: "",
        // });

        this.setState({ displayComment: true })

    }

    handleGetComment(e) {
        e.preventDefault();
        this.setState({ comment: e.target.value })
    }

    handleChangeSearchMsg(e) {
        e.preventDefault();
        const split = e.target.value.split(" ");
        this.setState({
            searchMsg: e.target.value,
            firstName: split[0],
            lastName: split[1],
        })
    }


    async handlePostSearchMsg(e) {
        e.preventDefault();


        const split = this.state.searchMsg.split(" ");

        if (split.length !== 2) {
            alert("Veuillez rentrer seulement le nom et prénom de la personne recherchée")
            return
        }

        let body = {
            firstName: split[0],
            lastName: split[1],
        }
        // const token = await JSON.parse(localStorage.getItem('access-token'));
        // const payload = await jwt.decode(token);
        // body = JSON.stringify(body);

        const result = await appFetch('POST', '/user/search', body);

        if (result.status !== 200) {
            if (result.status === 401) {
                alert(`l'utilisateur que vous avez séléctionner n'éxiste pas`)
            } else {
                //en cas d'erreur autre on renvois l'utilisateur vers une page erreur
                alert(`une erreur est survenue (code: ${result.status})`)
            }
            return;
        }

        this.setState({
            messageList: result.data,
            displaySearch: true,
        });
    }

    async handleCancelMsg(e) {
        e.preventDefault();

        this.setState({ displayMsg: false })

    }

    async handleCancelSearchMsg() {

        const result = await appFetch('GET', '/message');
        // const resultImage = await appFetch('POST', '/user/')

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

        const token = await JSON.parse(localStorage.getItem('access-token'));
        const payload = await jwt.decode(token);

        //si l'utilisateur est autorisé, on affiche le composant chat
        this.setState({
            display: true,
            messageList: result.data,
            user: payload.userId,
            userRole: payload.role,
        });

        this.setState({ displaySearch: false })
    }

    render() {
        return (
            this.state.display ?
                (
                    <Layout auth>
                        <div className="container_chat">
                            <div className="banner_chat">
                                <div className="banner_btn_post">
                                    {this.state.displayMsg ?
                                        <button onClick={this.handleCancelMsg} className="button_chat">Retour au forum</button>
                                        :
                                        <button onClick={this.handleDisplayMsg} className="button_chat">Poster un nouveaux message</button>}
                                </div>
                                <div className="banner_search">
                                    <input value={this.state.searchMsg} onChange={this.handleChangeSearchMsg}></input>
                                    <button onClick={this.handlePostSearchMsg}>Rechercher</button>
                                    {this.state.displaySearch ? <button onClick={this.handleCancelSearchMsg}>Retour</button> : null}
                                </div>
                            </div>
                            <div className={this.state.displayMsg ? "container_post_message" : "container_message"}>
                                {
                                    this.state.displayMsg ?
                                        this.renderForm()
                                        :
                                        this.renderMessagesList()
                                }
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