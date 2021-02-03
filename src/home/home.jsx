import React, {Component} from "react";
import {Redirect} from "react-router-dom"

class Home extends Component {
    state = {
        redirect: ""
    };

    handleNewGame = () => {
        const gameId = this.generateId(4);
        const playerId = this.generateId(4);
        this.setState({redirect: `/games/${gameId}/${playerId}`});
    };

    generateId = (length = 16) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    render() {
        const {redirect} = this.state;
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <button style={{
                    width: "700px",
                    marginTop: "50px"
                }} className="btn btn-primary" onClick={this.handleNewGame}>New Game
                </button>
                {redirect ? (<Redirect to={redirect}/>) : ''}
            </div>
        );
    }
}

export default Home;