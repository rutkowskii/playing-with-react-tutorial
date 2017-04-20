class Square extends React.Component {

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()} >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {    
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class GameHistory extends React.Component{

  render(){
    var me = this;
    return <ol>{
      this.props.moves.map(function(item, i){
        return <li key={i}><a href="#" onClick={() => me.props.histItemClicked(i)}> {item.letter} made a move at {item.index}</a></li>
      })
    }</ol>
  }
}

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      isXNext : true,
      status: this.resolveStatus(null),
      moves : []
    };
    this.gameOver = false;
  }

  handleClick(i){
    if(this.state.squares[i] || this.gameOver) return;

    const squares = this.state.squares.slice();
    squares[i] = this.resolveSign(this.state.isXNext);

    let move = {
      letter: this.resolveSign(this.state.isXNext),
      index: i,
      squares: squares.slice()
    };
    const moves = this.state.moves.slice();
    moves.push(move);

    const toggled = !this.state.isXNext;

    this.setState({
      squares: squares.slice(),
      isXNext: this.isXNextResolve(move),
      status: this.resolveStatus(move),
      moves: moves
    });    
  }

  handleHistoryMove(i){
    this.state.moves.splice(i+1);
    const moves = this.state.moves.slice();
    
    let currentMove = this.state.moves[i];
    const squares = currentMove.squares.slice();

    this.setState({
      squares : squares,
      moves: moves,
      status: this.resolveStatus(currentMove),
      isXNext: this.isXNextResolve(currentMove)
    });
    this.gameOver = false;
  }

  isXNextResolve(lastMove){
    if(lastMove == null) return true;
    return lastMove.letter != 'X';
  }

  resolveStatus(lastMove){ 
    if(lastMove == null) return 'Next player: X';
    var winner = calculateWinner(lastMove.squares);
    if(winner){
      this.gameOver = true;
      return 'AND THE WINNER IS ' + winner + " GAME OVER.";
    }
    return 'Next player: ' + this.resolveSign(this.isXNextResolve(lastMove));
  }

  resolveSign(next){
    return next ? 'X' : 'O';    
  }

  render() {
    return (
      <div className="game">

        <div className="game-board">
          <Board squares={this.state.squares} onClick={ (i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{this.state.status }</div>
          <GameHistory moves={this.state.moves} histItemClicked={(i) => this.handleHistoryMove(i)} />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
