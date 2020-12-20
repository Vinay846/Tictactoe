import React from 'react';
import "./style.css";
export default class StatusCard extends React.Component {

    render() {
        return (
        <>
            {this.props.turn === 'X' ?
            <div className="player1">
                Player 1's Turn
            </div>
                : 
                <div className="player2">
                Player 2's Turn
            </div>
                }
        </>
        );
    }
}