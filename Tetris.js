import { figuresMatrix, figuresColors } from "./contants";

export class Tetris {
  constructor(canvasSelector) {
    this._playfield = [];
    this._rowsCount = 20;
    this._columnsCount = 10;

    this._canvas = document.querySelector(canvasSelector);
    this._context = this._canvas.getContext("2d");
    this._grid = 32;

    this._figuresMatrix = figuresMatrix;
    this._figuresColors = figuresColors;

    this._endOfGame = false;
  }

  createPlayfield() {
    for (let row = -2; row < this._rowsCount; row++) {
      this._playfield[row] = [];

      for (let col = 0; col < this._columnsCount; col++) {
        this._playfield[row][col] = 0;
      }
    }
  }

  _getRandomFigure() {
    const figuresNames = ["line", "square", "T", "S", "Z", "J", "L"];
    const min = 0;
    const max = figuresNames.length - 1;

    const figureName =
      figuresNames[Math.floor(Math.random() * (max - min + 1)) + min];

    return figureName;
  }

  _getNextFigure() {
    const name = this._getRandomFigure();

    const matrix = this._figuresMatrix[name];
    const columnStart =
      this._playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
    const rowStart = name === "line" ? -1 : -2;

    this._figure = {
      name: name,
      matrix: matrix,
      rowStart: rowStart,
      columnStart: columnStart,
    };
  }

  _rotateFigure() {

  }

  _validateMove() {

  }

  _putFigure() {

  }

  _renderCell(x, y, width, height) {
    this._context.fillRect(x, y, width, height);
  }

  _renderPlayfield() {
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (this._playfield[row][col]) {
          const name = playfield[row][col];
          this._context.fillStyle = colors[name];

          // рисуем всё на один пиксель меньше, чтобы получился эффект «в клетку»
          this._renderCell(
            col * this._grid,
            row * this._grid,
            this._grid - 1,
            this._grid - 1
          );
        }
      }
    }
  }

  // метод для очистки игрового поля
  _resetField() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  // публичный метод для запуска игры
  startGame() {
    this._animation = requestAnimationFrame(startGame);

    // А нужно ли это?
    this._resetField();
    this._renderPlayfield();
  }

  _handleKeydown(evt) {
    if (!this._endOfGame) {
      if (evt.key === "ArrowUp") {
        
      }

      if (evt.key === "ArrowDown") {
        
      }

      if (evt.key === "ArrowDown") {
        
      }
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", )
  }
}
