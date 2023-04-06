'use strict';

/**what needs to reset?
 * board
 * currplayer
 *
 */

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */



class Game {
  constructor(height = 6, width = 7) {
    this.height = height;
    this.width = width;
    this.board = [];
    this.currPlayer = 1;
    // console.log(`just created ${this.currPlayer}`);
    this.makeBoard();
    this.makeHtmlBoard();
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    console.log("makeHtmlBoard this is ", this);

// ADDDING SOMETHING
    // this.makeBoard();

    const board = document.getElementById('board');

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');

    top.addEventListener('click', this.handleClick.bind(this));
    //  top.addEventListener('click', this.handleClick);

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `c-${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

 findSpotForCol(x) {
  for (let y = this.height - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

 placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${this.currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`c-${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

 endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

 handleClick(evt) {
  console.log("handleClick this is ", this);
  // get x from ID of clicked cell
  // console.log("target id is ", evt.target.id);
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = this.findSpotForCol(x); // FIX THIS LINE
  // const y = findSpotForCol.call(this, x); // FIX THIS LINE


  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = this.currPlayer;
  this.placeInTable(y, x);

  // check for win
  if (this.checkForWin()) {
    return this.endGame(`Player ${this.currPlayer} won!`);
  }

  // check for tie
  if (board.every((row) => row.every((cell) => cell))) {
    return this.endGame('Tie!');
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

 checkForWin() {

  function win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
    );
  }

  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      // find winner (only checking each win-possibility as needed)
      if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
        return true;
      }
    }
  }
}

// this.makeBoard();
// this.makeHtmlBoard();

}

new Game(6, 7);   // assuming constructor takes height, width


// newGame.makeBoard();
// newGame.makeHtmlBoard();