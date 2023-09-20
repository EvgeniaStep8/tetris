import "./assets/styles/style.css";
import Tetris from "./components/Tetris.js";

const tetris = new Tetris(
  "#tetris",
  ".score",
  ".overlay",
  "overlay_visible",
  ".new-game",
  "#key-up",
  "#key-left",
  "#key-right"
);

tetris.setEventListeners();
tetris.startGame();
