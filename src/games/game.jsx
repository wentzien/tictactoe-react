import React, {Component} from 'react';
import P5 from "../components/p5";

class Game extends Component {

    sketch = (p5) => {
        let x = 200;
        let y = 200;

        p5.setup = () => {
            p5.createCanvas(400, 400);
        };

        p5.draw = () => {
            p5.background(0);
            p5.fill(255);
            p5.rect(x, y, 50, 50);
        };
    };

    render() {
        return (
            <div>
                <P5 sketch={this.sketch}></P5>
            </div>
        );
    }
}

export default Game;