import Tile from "../Tile/Tile";
import "./ChessBoard.css";
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
}
const pieces: Piece[] = [];

// black pawns
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
}

// white pawns
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
}

// white rooks
pieces.push({ image: "assets/images/rook_w.png", x: 0, y: 0 });
pieces.push({ image: "assets/images/rook_w.png", x: 7, y: 0 });

// black rooks
pieces.push({ image: "assets/images/rook_b.png", x: 0, y: 7 });
pieces.push({ image: "assets/images/rook_b.png", x: 7, y: 7 });

// white knight
pieces.push({ image: "assets/images/knight_w.png", x: 1, y: 0 });
pieces.push({ image: "assets/images/knight_w.png", x: 6, y: 0 });

// black knight
pieces.push({ image: "assets/images/knight_b.png", x: 1, y: 7 });
pieces.push({ image: "assets/images/knight_b.png", x: 6, y: 7 });

const ChessBoard = () => {
  let board = [];
  for (let j = 7; j >= 0; j--) {
    for (let i = 0; i < 8; i++) {
      let number = i + j + 2;
      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile number={number} image={image} />);
    }
  }
  return <div id="chessboard">{board}</div>;
};

export default ChessBoard;
