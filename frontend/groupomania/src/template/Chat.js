import React from 'react';

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            display: false,
        }
    }


    async componentDidMount() {

        const token = JSON.parse(localStorage.getItem("access-token"));
        console.log(token)


        this.setState({ display: true });

    }

    render() {
        return (

            this.state.display ?
                (
                    <div className="container_chat">
                        <div className="chat">

                        </div>
                    </div>
                )
                :
                null

        )
    }
}

export default Chat;