// получаем доступ к холсту
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
// размер квадратика
const grid = 32;
// массив с последовательностями фигур, на старте — пустой
var tetrominoSequence = [];

// с помощью двумерного массива следим за тем, что находится в каждой клетке игрового поля
// размер поля — 10 на 20, и несколько строк ещё находится за видимой областью
var playfield = [];

// заполняем сразу массив пустыми ячейками
for (let row = -2; row < 20; row++) {
  playfield[row] = [];

  for (let col = 0; col < 10; col++) {
    playfield[row][col] = 0;
  }
}

playfield[2][6] = "red";
playfield[12][7] = "blue";
playfield[12][8] = "blue";
playfield[12][9] = "blue";

for (let row = 0; row < 20; row++) {
  for (let col = 0; col < 10; col++) {
    if (playfield[row][col]) {
      context.fillStyle = playfield[row][col];

      // рисуем всё на один пиксель меньше, чтобы получился эффект «в клетку»
      context.fillRect(col * grid, row * grid, grid - 1, grid - 1);
    }
  }
}
