export default class Tetris {
  constructor(
    canvasSelector,
    scoreSelector,
    overlaySelector,
    overlayVisibleClass,
    newGameButtonSelector
  ) {
    this._playfield = [];
    this._rowsCount = 20;
    this._columnsCount = 10;

    this._canvas = document.querySelector(canvasSelector);
    this._context = this._canvas.getContext("2d");
    this._grid = 32;

    this._figuresMatrix = {
      line: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      square: [
        [1, 1],
        [1, 1],
      ],
      L: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      J: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      T: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ]
    };

    this._figuresColors = {
      'line': 'violet',
      'square': 'yellow',
      'T': 'red',
      'S': 'green',
      'Z': 'lightblue',
      'J': 'hotpink',
      'L': 'blue'
    };;

    this._endOfGame = false;

    this._scoreElement = document.querySelector(scoreSelector);
    this._score = 0;
    this._delay = 500;

    this._overlay = document.querySelector(overlaySelector);
    this._overlayVisibleClass = overlayVisibleClass;
    this._newGameButton = document.querySelector(newGameButtonSelector);

    this._addDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  }

  // метод для  создания двумерного массива игрового поля, куда мы будем записывать фигуры
  _createPlayfield() {
    for (let row = -2; row < this._rowsCount; row++) {
      this._playfield[row] = [];

      for (let col = 0; col < this._columnsCount; col++) {
        this._playfield[row][col] = 0;
      }
    }
  }

  // метод для отображения счёта
  _renderScore() {
    this._scoreElement.textContent = `Счёт: ${this._score}`;
  }

  // метод для получения случайной фигуры, возвращает имя для случайной фигуры
  _getRandomFigure() {
    const figuresNames = ["line", "square", "T", "S", "Z", "J", "L"];
    const min = 0;
    const max = figuresNames.length - 1;

    const figureName =
      figuresNames[Math.floor(Math.random() * (max - min + 1)) + min];

    return figureName;
  }

  // метод для получения следующей фигуры на поле
  _getNextFigure() {
    const name = this._getRandomFigure();

    const matrix = this._figuresMatrix[name];
    const columnStart =
      this._playfield[0].length / 2 - Math.floor(matrix[0].length / 2);
    const rowStart = 1 - matrix.length;

    this._figure = {
      name: name,
      matrix: matrix,
      rowStart: rowStart,
      columnStart: columnStart,
    };
  }

  // метод для вращения фигуры
  _rotateFigure(matrix) {
    return matrix.map((row, i) =>
      row.map((val, j) => matrix[matrix.length - 1 - j][i])
    );
  }

  // метод валидации движения, возвращает булевое значение
  _validateMove(newMatrix, newRow, newColumn) {
    for (let row = 0; row < newMatrix.length; row++) {
      for (let column = 0; column < newMatrix[row].length; column++) {
        if (newMatrix[row][column]) {
          // 1 проверяем не выходит ли матрица за края поля
          if (
            column + newColumn > this._columnsCount - 1 ||
            column + newColumn < 0
          ) {
            return false;
          }
          // 2 проверяем не попадает ли матрица ниже поля
          if (newRow + row > this._rowsCount - 1) {
            return false;
          }
          // 3  проверяем не пересекается ли матрица с другой фигурой, если в ячейке куда мы хотим переместить фигуру не 0
          if (this._playfield[newRow + row][newColumn + column]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  _renderEndOfGame() {
    this._overlay.classList.add(this._overlayVisibleClass);
  }

  // метод для добавления матрицы фигуры в матрицу игрового поля
  _addFigureInPlayfield() {
    for (let row = 0; row < this._figure.matrix.length; row++) {
      for (let column = 0; column < this._figure.matrix[row].length; column++) {
        if (this._figure.matrix[row][column]) {
          // если край фигуры после установки вылезает за границы поля, то игра закончилась
          if (this._figure.rowStart + row <= 0) {
            this._endOfGame = true;
            this._renderEndOfGame();
            return;
          }
          // если всё в порядке, то записываем в массив игрового поля нашу фигуру
          this._playfield[this._figure.rowStart + row][
            this._figure.columnStart + column
          ] = this._figure.name;
        }
      }
    }
  }

  //метод для очистки заполненных рядов
  async _clearFullRows() {
    for (let row = 0; row < this._rowsCount; row++) {
      if (this._playfield[row].every((cell) => cell !== 0)) {
        //подсвечиваем все кубики зелёным цветом
        for (let column = 0; column < this._playfield[row].length; column++) {
          this._context.fillStyle = "rgb(46 255 0)";
          this._renderCell(column * this._grid, row * this._grid);
        }

        await this._addDelay(this._delay);
        // очищаем его и опускаем всё вниз на одну клетку
        for (let column = 0; column < this._playfield[row].length; column++) {
          this._playfield[row][column] = 0;
        }

        for (let rowPl = row; rowPl > 0; rowPl--) {
          for (let col = 0; col < this._playfield[rowPl].length; col++) {
            this._playfield[rowPl][col] = this._playfield[rowPl - 1][col];
          }
        }

        this._score += 100;
        this._renderScore();
      }
    }
  }

  // метод для отрисовки квадритиков поля
  _renderCell(x, y) {
    // чтобы получились кубики с границами, ширину и длину квадрата уменьшаем на 2
    this._context.fillRect(x, y, this._grid - 3, this._grid - 3);
  }

  // метод для отрисовки поля
  _renderPlayfield() {
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (this._playfield[row][col]) {
          const name = this._playfield[row][col];
          this._context.fillStyle = this._figuresColors[name];
          this._renderCell(col * this._grid, row * this._grid);
        }
      }
    }
  }

  // метод для очистки игрового поля
  _resetField() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _renderFigure() {
    this._context.fillStyle = this._figuresColors[this._figure.name];

    for (let row = 0; row < this._figure.matrix.length; row++) {
      for (let column = 0; column < this._figure.matrix[row].length; column++) {
        if (this._figure.matrix[row][column]) {
          this._renderCell(
            (this._figure.columnStart + column) * this._grid,
            (this._figure.rowStart + row) * this._grid
          );
        }
      }
    }
  }

  async _game() {
    do {
      await this._addDelay(this._delay);
      this._figure.rowStart++;
      this._resetField();
      this._renderPlayfield();

      this._context.fillStyle = this._figuresColors[this._figure.name];
      this._renderFigure();
    } while (
      this._validateMove(
        this._figure.matrix,
        this._figure.rowStart + 1,
        this._figure.columnStart
      )
    );

    this._addFigureInPlayfield();

    if (this._endOfGame) {
      return;
    }

    await this._clearFullRows();

    this._getNextFigure();
    this._game();
  }

  // публичный метод для запуска игры
  async startGame() {
    this._renderScore();
    this._createPlayfield();
    this._getNextFigure();

    await this._game();
  }

  _handleKeydown(evt) {
    if (!this._endOfGame) {
      if (evt.key === "ArrowUp") {
        const matrix = this._rotateFigure(this._figure.matrix);
        if (
          this._validateMove(
            matrix,
            this._figure.rowStart,
            this._figure.columnStart
          )
        ) {
          this._figure.matrix = matrix;
        }
      }

      if (evt.key === "ArrowLeft") {
        const column = this._figure.columnStart - 1;
        if (
          this._validateMove(this._figure.matrix, this._figure.rowStart, column)
        ) {
          this._figure.columnStart = column;
        }
      }

      if (evt.key === "ArrowRight") {
        const column = this._figure.columnStart + 1;
        if (
          this._validateMove(this._figure.matrix, this._figure.rowStart, column)
        ) {
          this._figure.columnStart = column;
        }
      }
    }
  }

  async _handleNewGame() {
    this._overlay.classList.remove(this._overlayVisibleClass);
    this._endOfGame = false;
    this._createPlayfield();
    this._getNextFigure();
    this._score = 0;
    await this._game();
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleKeydown.bind(this));

    this._newGameButton.addEventListener("click", this._handleNewGame.bind(this));
  }
}
