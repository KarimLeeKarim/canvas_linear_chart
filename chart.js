function drawChart(data) {
  let element = document.getElementById("canvas");
  let canvas = element.getContext("2d");

  let GRAPH_TOP = 25;
  let GRAPH_BOTTOM = 370;
  let GRAPH_LEFT = 25;
  let GRAPH_RIGHT = 475;
  let GRAPH_HEIGHT = 350;

  // RANDOM VALUES FOR GRAPH
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(data);

  let arrayLen = data.length;

  canvas.fillStyle = "lightgray";
  canvas.fillRect(0, 0, 500, 400);
  canvas.font = "12px Arial";

  // X and Y lines creating
  canvas.beginPath();
  canvas.lineWidth = 2.0;
  canvas.moveTo(GRAPH_LEFT, GRAPH_TOP);
  canvas.lineTo(GRAPH_LEFT, GRAPH_BOTTOM);
  canvas.lineTo(GRAPH_RIGHT, GRAPH_BOTTOM);
  canvas.stroke();

  //CALCULATE LARGEST PIECE OF DATA
  let largest = 0;
  for (let i = 0; i < arrayLen; i++) {
    if (data[i] > largest) {
      largest = data[i];
    }
  }

  canvas.fillStyle = "black";

  //LINE SETTING
  canvas.beginPath();
  canvas.lineJoin = "round";
  canvas.strokeStyle = "black";
  canvas.lineWidth = 0.5;
  canvas.moveTo(
    GRAPH_LEFT,
    GRAPH_HEIGHT - (data[0] / largest) * GRAPH_HEIGHT + GRAPH_TOP
  );

  canvas.fillText("0", GRAPH_LEFT, GRAPH_BOTTOM + 12);

  for (let i = 1; i < arrayLen; i++) {
    let X = (GRAPH_RIGHT / arrayLen) * i + GRAPH_LEFT;
    let Y = GRAPH_HEIGHT - (data[i] / largest) * GRAPH_HEIGHT + GRAPH_TOP;

    canvas.fillStyle = "black";

    //LINE
    canvas.lineTo(X, Y);

    //TEXT
    canvas.fillText(i, X, GRAPH_BOTTOM + 12);
    canvas.stroke();

    //POINTS
    canvas.fillStyle = "#ffff";
    canvas.beginPath();
    canvas.arc(X, Y, 4, 0, 2 * Math.PI);
    canvas.fill();
  }
  canvas.stroke();
};

let element = document.getElementById("canvas");
let canvas = element.getContext("2d");


let data = [7, 68, 20, 30, 60, 43, 55, 12, 34];

drawChart(data);

element.addEventListener("click", canvasClicked);

function canvasClicked() {
  canvas.clearRect(0, 0, 500, 400);
  drawChart(data);
}
