import React from 'react';
import './style.css';
export default class CountWinner extends React.Component {
	render() {
		return (
			<div className="">
				{this.props.gameStatus.playerOne ||
				this.props.gameStatus.playerTwo ||
				this.props.gameStatus.draw > 0 ? (
                    <>
					<div className="countWinner1">
						{`Player 1 Won: ${this.props.gameStatus.playerOne}`}
						<br />
						{`Draw: ${this.props.gameStatus.draw}`}
					</div>
                
					<div className="countWinner2">
						{`Player 2 Won: ${this.props.gameStatus.playerTwo}`}
						<br />
						{`Draw: ${this.props.gameStatus.draw}`}
					</div>
                    </>
				):(
					null
				)}
			</div>
		);
	}
}
