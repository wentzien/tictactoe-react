import React, {Component} from 'react';

class Gamestatus extends Component {

    gameStatus(gameStatus, player) {
        const {playAgain} = this.props;

        const youWon =
            <div className="alert alert-success" role="alert">You won
                <button onClick={playAgain} type="button" className="btn btn-link playAgain">
                    Play again</button>
            </div>;
        const youLost =
            <div className="alert alert-danger" role="alert">You lost
                <button onClick={playAgain} type="button" className="btn btn-link playAgain">
                    Play again</button>
            </div>;
        const draw =
            <div className="alert alert-warning" role="alert">Its a draw
                <button onClick={playAgain} type="button" className="btn btn-link playAgain">
                    Play again</button>
            </div>;
        const itsYourTurn =
            <div className="alert alert-primary" role="alert">
                Its your turn
            </div>;
        const opponentsTurn =
            <div className="alert alert-secondary" role="alert">
                Opponents turn
            </div>;
        const pending =
            <div className="alert alert-light" role="alert">
                loading...
            </div>;
        const waiting =
            <div className="alert alert-light" role="alert">
                Waiting for other player...
            </div>;
        const abWaiting =
            <div className="alert alert-light" role="alert">
                Other player is waiting for you...
                <button onClick={playAgain} type="button" className="btn btn-link">
                    Play again</button>
            </div>;

        if (gameStatus === "aWon" || gameStatus === "bWon") {
            if ((gameStatus === "aWon" && player === "a") || (gameStatus === "bWon" && player === "b")) return youWon;
            else return youLost;
        } else if (gameStatus === "draw") return draw
        else {
            if ((gameStatus === "aTurn" && player === "a") || (gameStatus === "bTurn" && player === "b")) return itsYourTurn;
            else if ((gameStatus === "aTurn" && player === "b") || (gameStatus === "bTurn" && player === "a")) return opponentsTurn;
            else if (gameStatus === "pending") return pending;
            else if (gameStatus === "aWaiting" && player === "b" || gameStatus === "bWaiting" && player === "a") {
                return abWaiting;
            } else {
                return waiting;
            }
        }
    };

    render() {
        const {gameStatus, player, aScore, bScore} = this.props;
        let yourScore, oScore;
        if(player === "a") {
            yourScore = aScore;
            oScore = bScore;
        } else {
            yourScore = bScore;
            oScore = aScore;
        }
        console.log(gameStatus, player)
        return (
            <div>
                <div className="alert alert-light" role="alert" style={{textAlign: "center"}}>
                    Session Score: {yourScore} (you) - {oScore}
                </div>
                {this.gameStatus(gameStatus, player)}
            </div>
        );
    }
}

export default Gamestatus;