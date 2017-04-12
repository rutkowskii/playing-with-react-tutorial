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

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      isXNext : true,
      status: this.resolveStatus()
    };
  }

  handleClick(i){
    if(this.state.squares[i]) return;

    const squares = this.state.squares.slice();
    squares[i] = this.resolveSign(this.state.isXNext);

    const toggled = !this.state.isXNext;

    this.setState({
      squares: squares,
      isXNext: toggled,
      status: this.resolveStatus(toggled)
    });    
  }

  resolveStatus(next){ 
    if(typeof this.state === 'undefined') return 'Next player: X';
    var winner = calculateWinner(this.state.squares);
    if(winner){
      return 'AND THE WINNER IS ' + winner;
    }
    return 'Next player: ' + this.resolveSign(next)
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
          <ol>
            
          </ol>
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
