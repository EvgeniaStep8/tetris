import Tetris from "./Tetris.js";

const tetris = new Tetris("#tetris", ".score");

tetris.setEventListeners();
tetris.startGame();
