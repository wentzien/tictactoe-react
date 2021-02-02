import React, {Component} from 'react';
import io from "socket.io-client";
import P5 from "../components/p5";

class Game extends Component {
    state = {
        player: "",
        playerId: "",
        opponentId: "",
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        aScore: 0,
        bScore: 0,
        gameStatus: "pending",
    };

    socket;

    urlApi = "http://localhost:3001";

    async componentDidMount() {

        this.socket = io(this.urlApi);

        const {gameId, playerId} = this.props.match.params;
        this.setState({gameId, playerId})

        this.socket.emit("join", {gameId, playerId}, (answer) => {
            const {player} = answer;
            this.setState({player})
        });

        this.socket.on("gameData", (gameData) => {
            const {board, aScore, bScore, gameStatus} = gameData;
            this.setState({board, aScore, bScore, gameStatus});
        });

    }

    componentWillUnmount() {
        this.socket.emit("disconnect");
        this.socket.off();
    }

    sketch = (p5) => {
        let xArea, yArea;
        const SPACE = 5;

        p5.setup = () => {
            let size = p5.min(p5.windowHeight - 100, p5.windowWidth - 100);
            p5.createCanvas(size, size);
            xArea = p5.width / 3;
            yArea = p5.height / 3;
            // resetGame();
            // p5.noLoop();
        };

        p5.draw = () => {
            const {board} = this.state;

            function drawBoard() {
                p5.strokeWeight(1);

                p5.line(0, yArea, p5.height, yArea);
                p5.line(0, 2 * yArea, p5.height, 2 * yArea);

                p5.line(xArea, 0, xArea, p5.width);
                p5.line(2 * xArea, 0, 2 * xArea, p5.width);
            }

            function drawAllSymbols() {
                for (let y = 0; y < 3; y++) {
                    for (let x = 0; x < 3; x++) {
                        if (board[y][x] === "a") drawSymbolX(y, x);
                        if (board[y][x] === "b") drawSymbolO(y, x);
                    }
                }
            }

            function drawSymbolX(y, x) {
                p5.strokeWeight(SPACE);
                p5.line(x * xArea + SPACE, y * yArea + SPACE, (x + 1) * xArea - SPACE, (y + 1) * yArea - SPACE);
                p5.line((x + 1) * xArea - SPACE, y * yArea + SPACE, x * xArea + SPACE, (y + 1) * yArea - SPACE);
            }

            function drawSymbolO(y, x) {
                p5.strokeWeight(SPACE);
                p5.ellipseMode(p5.CORNER);
                p5.circle(x * xArea + SPACE, y * yArea + SPACE, xArea - 2 * SPACE);
            }

            p5.clear();
            drawBoard();
            drawAllSymbols();
        };

        p5.mousePressed = () => {
            let x = Math.floor(p5.mouseX / xArea);
            let y = Math.floor(p5.mouseY / yArea);
            if(x < 3 && y < 3) {
                this.updateBoard(x, y);
                p5.redraw();
            }
        }
    };

    updateBoard = (x, y) => {
        const {player, gameStatus, gameId} = this.state;
        if((player === "a" && gameStatus === "aTurn") || (player === "b" && gameStatus === "bTurn")) {
            let board = [...this.state.board];
            if(board[y][x] === 0) {
                board[y][x] = player;
                let gameData = {
                    board,
                    gameId
                };
                this.setState({board, gameStatus: "pending"});
                this.socket.emit("gameProgress", gameData)
            }
        }
    };


    render() {
        return (
            <div>
                <P5 sketch={this.sketch}/>
            </div>
        );
    }
}

export default Game;