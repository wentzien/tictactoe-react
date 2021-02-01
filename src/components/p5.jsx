import React, {Component} from "react";
import p5 from "p5";

class P5 extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.p5 = new p5(this.props.sketch, this.ref.current);
    }


    render() {
        return (
            <div ref={this.ref}>

            </div>
        );
    }
}

export default P5;