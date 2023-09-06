const canvas = document.querySelector("#tetris");
const context = canvas.getContext('2d');
const grid = 32;

const figuresAtTheStart = [];
const playingfield = [];

let figure;
let gameOver = false;
let animation = null;

for (let row = -2; row < 20; row++) {
  playingfield[row] = [];
  for (let column = 0; column < 10; column++) {
    playingfield[row][column] = 0;
  }
}

const figuresMatrix = {
  line: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  square: [
    [1, 1],
    [1, 1],
  ],
  L: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
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
}

const colors = {
  'line': 'cyan',
  'square': 'yellow',
  'T': 'purple',
  'S': 'green',
  'Z': 'red',
  'J': 'blue',
  'L': 'orange'
};

const generateRandomFigureAtTheStart = () => {
  const arr = [ "line", "square", "T", "S", "Z", "J", "L" ];
  const min = 0;
  const max = arr.length - 1;

  const figureName = arr[Math.floor(Math.random() * (max - min + 1)) + min];

  return figureName;
}

const getNextFigure = () => {
  const name = generateRandomFigureAtTheStart();

  const matrix = figuresForm[name];
  const columnStart = playingfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
  const rowStart = name === 'line' ? -1 : -2;

  figure =  {
    name: name, 
    matrix: matrix,  
    rowStart: rowStart,        
    columnStart: columnStart         
  }
}

const rotateMatrix = (matrix) => {
  const endRow = matrix.length - 1;
  const rotatedMatrix = matrix.map((row, i) =>
    row.map((column, j) => matrix[endRow - j][i])
  );
  return rotatedMatrix;
}

const isValidMove = (matrix, rows, columns) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      if (matrix[row][column] && (
          // если выходит за границы поля…
          columns + column < 0 ||
          columns + column >= playingfield[0].length ||
          rows + row >= playingfield.length ||
          // …или пересекается с другими фигурами
          playingfield[rows + row][columns + column])
        ) {
        // то возвращаем, что нет, так не пойдёт
        return false;
      }
    }
  }
  // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
  return true;
}

const fixFigure = () => {
  // обрабатываем все строки и столбцы в игровом поле
  for (let row = 0; row < figure.matrix.length; row++) {
    for (let column = 0; column < figure.matrix[row].length; column++) {
      if (figure.matrix[row][column]) {
        // если край фигуры после установки вылезает за границы поля, то игра закончилась
        if (figure.row + row < 0) {
          return showGameOver();
        }
        // если всё в порядке, то записываем в массив игрового поля нашу фигуру
        playingfield[figure.row + row][figure.column + column] = figure.name;
      }
    } 
  }

  // проверяем, чтобы заполненные ряды очистились снизу вверх
  for (let row = playingfield.length - 1; row >= 0; ) {
    // если ряд заполнен
    if (playingfield[row].every(cell => cell === 1)) {

      // очищаем его и опускаем всё вниз на одну клетку
      for (let i = row; i >= 0; i--) {
        for (let j = 0; j < playfield[i].length; j++) {
          playfield[i][j] = playfield[i-1][j];
        }
      }
    }
    else {
      // переходим к следующему ряду
      row--;
    }
  }
  // получаем следующую фигуру
  getNextFigure();
}