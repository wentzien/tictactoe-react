import React, {Component} from 'react';

class Invite extends Component {
    // url = process.env.REACT_APP_URL + process.env.REACT_APP_SUBDIRECTORIES;
    url = process.env.REACT_APP_URL;

    copyToClipboard = () => {
        // const input = this.input;
        // input.select();
        // document.execCommand("copy");

        const input = document.createElement("input");
        document.body.appendChild(input);
        input.value = this.url + "/games/" + this.props.gameId + "/" + this.generateId(4);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
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
        return (
            <button className="btn btn-link" onClick={this.copyToClipboard}>
                Invite Link
            </button>
        );
    }
}

export default Invite;