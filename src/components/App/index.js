import React from 'react';
import './style.css';
import GridRow from '../GridRow';
import Header from '../Header';
import StatusCard from '../StatusCard';
import CountWinner from '../CountWinner';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      playerTurn: "X",
      boardState: [
        ["","",""],
        ["","",""],
        ["","",""],
      ],
      gameStatus:{
        playerOne: 0,
        playerTwo: 0,
        draw: 0
      }
    };
    this.playerClick = this.playerClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.alertWin = this.alertWin.bind(this);
  }
  playerClick(i, j) {
    if(this.state.boardState[i][j] === "") {
      const currBoardState = this.state.boardState;
      currBoardState[i][j] = this.state.playerTurn;
      this.setState({boardState: currBoardState});
      this.setState({ playerTurn: this.state.playerTurn === "X" ? "O" : "X"});
    }
  }
  
  componentDidUpdate() {
    
    let won = true;
        
    // check for rows
    for(let i=0; i<3;i++) {
        won = true;

        for(let j=1; j<3; j++) {
            if(this.state.boardState[i][j] !== this.state.boardState[i][j-1]) {
                won = false;
                break;
            }
        }
        if(won && this.state.boardState[i][0]!== '') {
            return this.alertWin(this.state.boardState[i][0]);
        }
    }
    // check for cols
    for(let j=0; j<3; j++) {
        won = true;

        for(let i=1; i<3; i++) {
            if(this.state.boardState[i][j] !== this.state.boardState[i-1][j]) {
                won = false;
                break;
            }
        }
        if(won && this.state.boardState[0][j]!== '') {
            return this.alertWin(this.state.boardState[0][j]);
        }
    }
    // check forward diagnol
    won = true;
    for(let i=1; i<3; i++) {
        if(this.state.boardState[i][i] !== this.state.boardState[i-1][i-1]) {
                won = false;
                break;
            }
    }
    if(won && this.state.boardState[0][0]!== '') {
            return this.alertWin(this.state.boardState[0][0]);
    }
    // check anti-diagnol
    won = true;
    for(let i=1; i<3; i++) {
        if(this.state.boardState[i][2-i] !== this.state.boardState[i-1][2-i+1]) {
                won = false;
                break;
            }
    }
    if(won && this.state.boardState[2][0]!== '') {
            return this.alertWin(this.state.boardState[2][0]);
    }
    // check for draw
    let draw = true;
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            if(this.state.boardState[i][j] === '') {
                draw = false;
                break;
            }
        }
        if(draw === false) {
            break;
        }
    }
    if(draw) {
        return this.alertDraw();
    }

}
alertWin(playerWon) {
    if(playerWon === 'X') {
      setTimeout(()=>{
        alert('Congratulations! Player1 wins');
        this.resetGame();
        const newStaus = this.state.gameStatus.playerOne;
        this.setState({
          gameStatus:{
            playerOne:newStaus+1,
            playerTwo: this.state.gameStatus.playerTwo,
            draw: this.state.gameStatus.draw

          }
        })
      }, 0);
    }
    else {
      setTimeout(()=>{
        alert('Congratulations! Player2 wins');
        this.resetGame();
        const newStaus = this.state.gameStatus.playerTwo;
        this.setState({
          gameStatus:{
            playerOne:this.state.gameStatus.playerOne,
            playerTwo: newStaus+1,
            draw: this.state.gameStatus.draw
          }
        })
      }, 0)
    }
}

alertDraw() {
  setTimeout(()=>{
    alert('Draw!');
    this.resetGame();
    const newStaus = this.state.gameStatus.draw;
    this.setState({
      gameStatus:{
        playerOne: this.state.gameStatus.playerOne,
        playerTwo: this.state.gameStatus.playerTwo,
        draw: newStaus+1
      }
    })
    }, 0);
    
}

resetGame() {
  this.setState({
    playerTurn: "X",
      boardState: [
        ["","",""],
        ["","",""],
        ["","",""],
      ],
  });
}

  render() {


    return (
      <>
      <div className="container">
        <Header />
        <div id="board">
          {this.state.boardState.map((boardRow, rowIdx) => (
            <GridRow 
              key={rowIdx} 
              row={boardRow} 
              rowIdx={rowIdx} 
              playerClickCB={this.playerClick} 
            />
          ))}
        </div>
        <button id="reset" onClick={this.resetGame}>Reset</button>
      </div>
        <StatusCard turn={this.state.playerTurn}/>
        <CountWinner turn={this.state.playerTurn} gameStatus={this.state.gameStatus} />
        </>
    );
  }
}

export default App;