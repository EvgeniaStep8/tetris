const figuresMatrix = {
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
}

const figuresColors = {
  'line': 'violet',
  'square': 'yellow',
  'T': 'red',
  'S': 'green',
  'Z': 'lightblue',
  'J': 'pink',
  'L': 'blue'
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export { figuresMatrix, figuresColors, delay };