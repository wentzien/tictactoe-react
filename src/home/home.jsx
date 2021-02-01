import React, {Component} from "react";
import {Redirect} from "react-router-dom"

class Home extends Component {
    state = {
        redirect: ""
    };

    handleNewGame = () => {
        const gameId = this.generateId();
        this.setState({redirect: `/games/${gameId}`})
    };

    generateId = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 8; i++) {
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