myCanvas.width = 900;
myCanvas.height = 400;
const margin = 30;
const n = 30;
const array = [];
let moves = [];
const cols = [];
const spacing = (myCanvas.width - margin * 2) / n;
const ctx = myCanvas.getContext("2d");

const maxColumnHeight = 200;

init();


function init() {
    for (let i = 0; i < n; i++) {
      array[i] = Math.random();
    }
    moves = [];
    for (let i = 0; i < array.length; i++) {
      const x = i * spacing + spacing / 2 + margin;
      const y = myCanvas.height - margin - i * 3;
      const width = spacing - 4;
      const height = maxColumnHeight * array[i];
      cols[i] = new Column(x, y, width, height);
    }
  }