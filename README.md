# @chesslib/core
A fast &amp; universal chesslibrary with Basic AI support. This is the core part of the @chesslib bundle.

This library is required for
- @chesslib/ai
- @chesslib/game
- @chesslib/plugin


## Install:
`npm install @chesslib/core`

https://www.npmjs.com/package/@chesslib/core

## Intro

**Get all available moves**
```typescript
import { Chessboard, Positions, COLORS } from "@chesslib/core";

var board = Chessboard.fromPosition(Positions.default);

// Get all possible moves
var moves = board.getFENMoves();
if(board.tryMoveFEN(moves[0].from, moves[0].to))
{
    console.log("Move was valid");
}
```

**Get all available moves for BLACK**
```typescript
// Get all possible moves for BLACK
var moves = board.getFENMoves(COLORS.BLACK);
```

**Get all available moves for A2 Pawn?**
```typescript
// Get all possible moves for BLACK
var moves = board.getFENMovesatFEN("a2");
```

**Validate if move is possible?**
```typescript
// Get all possible moves for BLACK
if(board.isValidMoveFEN("a2", "a4"))
{
	console.log("Move is valid");
}
```

**Check if king was captured**
```typescript
// Get all possible moves
if(board.findPieces("K").length == 1)
{
	console.log("GAME OVER!");
}
```
For more please see examples folder

## Chess AI

The AI is a simple implementation of a basic board evaluation. The AI is trying every moves possible confirming the board value is better for a given move. The search depth can be configured, and due to it's high CPU intensivity it is recommended to use it with webworkers in browsers, and run it as a seperate process or thread in nodejs if required.

AI REPO:
https://github.com/azarus/chesslib-ai
The example use of the AI is available in the repo under examples/ folder.


# API 

### Chessboard

#### Thirdparty:

- **Add Move History**

`addHistory(piece: Piece, data: any);`

- **Property Board Size**

`boardSize: {x: number, y: number}`

- **Returns the character representation of a square by it's index**

`charIndex(index: number): string;`

- **clones the board**

`clone(): Chessboard`



#### Squares

- **clears a square**

`clearSquare(square: Square);`

- **Spawns a piece on a square**

`createPiece(type: string, color: number | COLORS, square: Square);`

- **Makes a move using a move object**

`doMove(move: MoveObject);`

- **Makes a move using strings**

`doMoveFEN(move: { from: string, to: string});`

- **Converts a FEN string to position**

`FENtoPosition(fen: string): {x: number, y: number};`

- **Returns the square for a FEN string**

`FENToSquare(fen: string): SVGPathSegCurvetoQuadraticRel`

- **Finds all pieces on the board**

`findPieces(pieceType: string, color: number | COLORS): Piece[]`

- **Returns a board object (Usefull for chessboard visualization)**

`getBoard(): { BoardObject }`

- **Set's the board from an object**

`setBoard(board: { BoardObject });`

- **Returns the 2D Array representation of the board**

`savePositions(): any[]`

- **Set's the board from a 2D Array**

`loadPositions(positions: any[]);`


```typescript
import { Chessboard, Positions } from "@chesslib/core";

var board = Chessboard.fromPosition(Positions.default);

// Get all possible moves
var moves = board.getFENMoves();
if(board.tryMoveFEN(moves[0].from, moves[0].to))
{
    console.log("Move was valid");
}
```
For more please see examples folder

Use the lib together with:
- [https://www.npmjs.com/package/@chesslib/ai](https://www.npmjs.com/package/@chesslib/ai)

and

- [https://github.com/azarus/ng2-chessboard](https://github.com/azarus/ng2-chessboard)

to create your game. Have happy coding :)


### License:

Apache 2.0


### Got an issue or question?

- [Open an issue! https://github.com/azarus/chesslib-core/issues](https://github.com/azarus/chesslib-core/issues)
