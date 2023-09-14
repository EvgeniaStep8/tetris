import Tetris from "./Tetris.js";

const tetris = new Tetris("#tetris");

tetris.setEventListeners();
tetris.createPlayfield();
tetris.startGame();
