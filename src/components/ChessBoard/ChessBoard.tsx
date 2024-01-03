import { useEffect, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./ChessBoard.css";
import Referee from "../Referee/referee";
// const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
// const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
}

export enum PieceType {
  PAWN,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
  BISHOP,
}

export enum TeamType {
  OPPONENT,
  OUR,
}

const initialBoardState: Piece[] = [];
// black pawns
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/images/pawn_b.png",
    x: i,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  });
}

// white pawns
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/images/pawn_w.png",
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  });
}

// rest of the pieces
for (let p = 0; p < 2; p++) {
  const team: TeamType = p == 0 ? TeamType.OPPONENT : TeamType.OUR;
  const type = team === TeamType.OPPONENT ? "b" : "w";
  const y = team === TeamType.OPPONENT ? 7 : 0;
  initialBoardState.push({
    image: `assets/images/rook_${type}.png`,
    x: 0,
    y: y,
    type: PieceType.ROOK,
    team,
  });
  initialBoardState.push({
    image: `assets/images/rook_${type}.png`,
    x: 7,
    y: y,
    type: PieceType.ROOK,
    team,
  });

  initialBoardState.push({
    image: `assets/images/knight_${type}.png`,
    x: 1,
    y: y,
    type: PieceType.KNIGHT,
    team,
  });
  initialBoardState.push({
    image: `assets/images/knight_${type}.png`,
    x: 6,
    y: y,
    type: PieceType.KNIGHT,
    team,
  });

  initialBoardState.push({
    image: `assets/images/bishop_${type}.png`,
    x: 2,
    y: y,
    type: PieceType.BISHOP,
    team,
  });
  initialBoardState.push({
    image: `assets/images/bishop_${type}.png`,
    x: 5,
    y: y,
    type: PieceType.BISHOP,
    team,
  });

  initialBoardState.push({
    image: `assets/images/king_${type}.png`,
    x: 3,
    y: y,
    type: PieceType.KING,
    team,
  });
  initialBoardState.push({
    image: `assets/images/queen_${type}.png`,
    x: 4,
    y: y,
    type: PieceType.QUEEN,
    team,
  });
}

const ChessBoard = () => {
  const chessboardRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const referee = new Referee();

  useEffect(() => {
    setPieces(initialBoardState);
  }, []);
  const grabHandle = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
      );
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  };

  const movePiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  };

  const dropPiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      // Update the piece position
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            const isValid = referee.isValidMove(
              gridX,
              gridY,
              x,
              y,
              p.type,
              p.team,
              value
            );

            if (isValid) {
              p.x = x;
              p.y = y;
            } else {
              activePiece.style.position = "absolute";
              activePiece.style.removeProperty("top");
              activePiece.style.removeProperty("left");
            }
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
    }
  };
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
      board.push(<Tile key={`${i},${j}`} number={number} image={image} />);
    }
  }
  return (
    <div
      ref={chessboardRef}
      onMouseDown={(e) => grabHandle(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
    >
      {board}
    </div>
  );
};

export default ChessBoard;
