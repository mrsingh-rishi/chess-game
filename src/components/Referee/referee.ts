import { Piece, PieceType, TeamType } from "../ChessBoard/ChessBoard";

export default class Referee {
  tilesOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) return true;
    return false;
  }

  TileIsOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team != team
    );
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    // Pawn Movements
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;
      // Movement Logic
      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        return (
          !this.tilesOccupied(x, y, boardState) &&
          !this.tilesOccupied(x, y - pawnDirection, boardState)
        );
      } else if (px === x && y - py === pawnDirection) {
        return !this.tilesOccupied(x, y, boardState);
      }
      // Attacking Logic
      else if (x - px === -1 && y - py === pawnDirection) {
        // Attack in Upper or Bottom Left Corner
        return this.TileIsOccupiedByOpponent(x, y, boardState, team);
      } else if (x - px === 1 && y - py === pawnDirection) {
        // Attack in Upper or Bottom Right Corner
        return this.TileIsOccupiedByOpponent(x, y, boardState, team);
      }
    }

    // Rook Movement
    if (type === PieceType.ROOK) {
      if (team === TeamType.OUR) {
        if (px === x) {
          return true;
        } else if (py === y) {
          return true;
        }
      } else {
        if (px === x) {
          return true;
        } else if (py === y) {
          return true;
        }
      }
    }
    // King Movement
    if (type === PieceType.KING) {
      if (team === TeamType.OUR) {
        if (
          (x - px === 1 || x - px === -1 || x - px === 0) &&
          (y - py === 1 || y - py === -1 || y - py === 0)
        ) {
          return true;
        }
      } else {
        if (
          (x - px === 1 || x - px === -1 || x - px === 0) &&
          (y - py === 1 || y - py === -1 || y - py === 0)
        ) {
          return true;
        }
      }
    }

    // Knight Movement
    if (type === PieceType.KNIGHT) {
      if (team === TeamType.OUR) {
        if ((x - px == 2 || x - px == -2) && (y - py === 1 || y - py === -1)) {
          return true;
        } else if (
          (x - px == 1 || x - px == -1) &&
          (y - py === 2 || y - py === -2)
        ) {
          return true;
        }
      } else {
        if ((x - px == 2 || x - px == -2) && (y - py === 1 || y - py === -1)) {
          return true;
        } else if (
          (x - px == 1 || x - px == -1) &&
          (y - py === 2 || y - py === -2)
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
