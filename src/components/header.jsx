import React, {Component} from 'react';
import Invite from "./invite";

class Header extends Component {
    render() {
        const {newSession} = this.props;
        return (
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-link" onClick={newSession}>
                            New Session
                        </button>
                    </li>
                    <li className="nav-item">
                        <Invite gameId={this.props.gameId}/>
                    </li>
                </ul>
        );
    }
}

export default Header;