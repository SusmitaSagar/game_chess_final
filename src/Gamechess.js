import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import Chess from 'chess.js';

import Chessboard from 'chessboardjsx';
/////archana/////
class HumanVsHuman extends Component {
   propTypes = { children: PropTypes.func }; 

  state = {
    fen: 'start',
    //fen is a string used to display exact position of the chesspiese
    dropSquareStyle: {},
    // custom square styles,object
    squareStyles: {},
    // jis piece p click kiya gya h vo square
    pieceSquare: '',
    // currently clicked square
    square: '',
    history: [],
    //game_over:{}
  };
////////////umesh///////////////////
  componentDidMount() {
    this.game = new Chess();  //use this.game everwhere 
  }

  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };
  
  // show possible moves and suggestions
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: { 
              background:
                'radial-gradient(circle, green 30%, transparent 65%)',
              //borderRadius: '100%'
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({ 
      squareStyles: { ...squareStyles, ...highlightStyles } //spread syntax object can be directly passed to component instad one by one
    }));
  };
////////////////me/////////////////////
  onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote pawn to a queen if reach at other side
    });

    // illegal move
    if (move === null) return; //from console

    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
     // squareStyles: squareStyling({ pieceSquare, history })
    }));
  };

  onMouseOverSquare = square => {
    // checls the list of possible valig bmoves for this square
    let moves = this.game.moves({
      square: square, // suggestion shown in valiid square
      verbose: true,  //valid moves me board k ander maoximum sugggestion
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };
/////////////////////archana/////////////////////////
  onMouseOutSquare = square => this.removeHighlightSquare(square);


 ///////////////////umesh///////////////

  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: 'q' // always promote pawn to a queen for 
    });

    // illegal move and it will come to its original position iteself ,
    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: ''
    });
    };
//////////////////////////////////
    //  if (game_over ) {
    //   this.setState({
    //     game_over:this.game_over(),
    //     verbose:true
    //       <h1>game_over </h1> : <span></span>
    //   })
    //  } 
////////////////////archana///////////////////
    render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick
    });
  }
}

////////////////////////me/////////////////////////////

console.log(Chess)



export default function WithMoveValidation() {


  return (

    <div>
      <HumanVsHuman>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick
        }) => (
          <Chessboard
            id="humanVsHuman"
            calcWidth={({ screenWidth }) => (screenWidth < 500 ? 60: 650)} //trenary , condition ? if true: if false
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: '5px',
              boxShadow: `0 5px 500px rgba(0, 0, 0, 1)`
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1 ].from; //session history, including the current event
  const targetSquare = history.length && history[history.length - 1 ].to; //defined targetsquare



  return {
    // {
    //  this.game  //Returns true if the game has ended via checkmate, repetition Otherwise, returns false.True if the game has ended via checkmate.
    // game_over() <div><h1>game_over</h1></div>:<span></span>
    // }               

    [pieceSquare]: { backgroundColor: '' },  // onclick square the colour of grid changes.
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: 'lightblue'
      }
    }),
 

    ...(history.length && {
      [targetSquare]: {
        backgroundColor: 'lightgreen'
      }
    })
  };
};