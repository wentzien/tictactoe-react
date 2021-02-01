import React, {Component} from 'react';
import P5 from "../components/p5";

class Game extends Component {
    state = {
        board: [
            [0, "O", 0],
            [0, "X", 0],
            [0, 0, "X"]
        ],
        gameOver: false,
        aPlayerSymbol: "X",
        bPlayerSymbol: "O",
        aScore: 0,
        bScore: 0,
    }

    sketch = (p5) => {
        let xArea, yArea;
        const SPACE = 5;
        const {board} = this.state;

        p5.setup = () => {
            let size = p5.min(p5.windowHeight - 100, p5.windowWidth - 100);
            p5.createCanvas(size, size);
            xArea = p5.width / 3;
            yArea = p5.height / 3;
            // resetGame();
            p5.noLoop();
        };

        p5.draw = () => {
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
                        if (board[y][x] === "X") drawSymbolX(y, x);
                        if (board[y][x] === "O") drawSymbolO(y, x);
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
            drawAllSymbols();
            drawBoard();
        };
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