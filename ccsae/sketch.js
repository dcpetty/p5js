/*
 * CCSAE
 */

const canvasWidth = 600, canvasHeight = 800, d = 30;
var explainers, experiments;

/** Returns Object parsed from path csv file. For every nonempty line of 
 * path file split on ',' after header, append to Object whose key is 
 * first element of split line and whose value is rest of split line.
 * @param {string} path path to csv file
 * @returns {Object}
 */
async function parse(path) {
  try {
    let result = Object();
    const response = await fetch(path);
    const csv = await response.text();
    const lines = csv.split(`\n`);
    const header = lines[0].split(`,`);
    console.assert(header.length > 0, `Missing header in '${path}'`)
    console.log(`${path}: ${header}`);
    // console.log(csv);
    for ([i, l] of csv.split(`\n`).entries()) {
      const tokens = l.split(`,`);
      if (i > 0 && tokens.some((e) => e.length > 0)) {
        result[tokens[0]] = tokens.slice(1);
      }
    }
    return result;
  } catch(err) {
    console.log(err);
  }
}

function path(v, d) {
  const
    [x, y, p] = v, [s, e] = p,
    [sx, sy] = explainers[s], 
    [ex, ey] = explainers[e];
  push();
  noFill();
  stroke('#639');
  strokeWeight(2);
  // Draw connection.
  beginShape();
  curveVertex(+sx, +sy);
  curveVertex(+sx, +sy);
  curveVertex(+x, +y);
  curveVertex(+ex, +ey);
  curveVertex(+ex, +ey);
  endShape();
  // https://editor.p5js.org/mahdadbor/sketches/evyWdjCSH
  // Draw arrowhead.
  fill(0);
  translate(ex, ey);
  vec = createVector(x, y).sub(ex, ey);
  rotate(vec.heading());
  translate(d / 2, 0);
  triangle(0, 0, d / 4, d / 8, d / 4, -d / 8);
  pop();
}

function disc(k, x, y, d, c) {
  push();
  strokeWeight(0);
  fill(c); // noFill();
  ellipse(+x, +y, d);
  fill(0);
  textAlign(CENTER, CENTER);
  text(k, +x, +y);
  pop();
}

function hover(cx, cy, alt, d) {
  push();
  stroke('white');
  fill('white');
  rectMode(CENTER);
  rect(+cx, +cy, d);
  fill('black');
  textAlign(CENTER, CENTER);
  text(alt, +cx, +cy, d);
  pop();
}

function isOver(obj, d) {
  for (const [key, value] of Object.entries(obj)) {
    const [x, y] = value;
    if (dist(+x, +y, mouseX, mouseY) < d / 2) {
      return key;
    }
  }
  return undefined;
}

function echoMouse() {
  push();
  fill('black');
  textAlign(CENTER, CENTER);
  if (mouseX > d / 2 && mouseY > d / 2)
    text(`(${mouseX}, ${mouseY})`, mouseX, mouseY);
  pop();
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  const link = 
    `https://raw.githubusercontent.com/dcpetty/p5js/refs/heads/main/ccsae`;
  // Anonymous async function for experiments promise.
  (async () => {
    experiments = await parse(`${link}/experiments.csv`);
    console.log(experiments);
    explainers = await parse(`${link}/explainers.csv`);
    console.log(explainers);
  })();
}

function draw() {
  if (!experiments || !explainers) return;  // wait for initialization
  // Redraw canvas.
  clear();
  background(240);
  // Draw paths for each experiment.
  for (const [key, value] of Object.entries(experiments)) {
    if (value) path(value, d * 1.5);
  }
  // Draw experiment discs.
  for (const [key, value] of Object.entries(experiments)) {
    const [x, y, p] = value;
    disc(key, x, y, d, 'pink');
  }
  // Draw explainer discs.
  for (const [key, value] of Object.entries(explainers)) {
    const [x, y, ] = value;
    disc(key, x, y, d * 1.5, 'gold');
  }

  let key;
  // Check if mouse isOver an experiment and hover the alt text.
  key = isOver(experiments, d);
  if (key) {
    const [cx, cy, p, u, a] = experiments[key];
    hover(cx, cy, a, d * 3);
  }
  // Check if mouse isOver an explainer and hover the alt text.
  key = isOver(explainers, d * 1.5);
  if (key) {
    const [cx, cy, u, a] = explainers[key];
    hover(cx, cy, a, d * 3);
  }
  // Otherwise, echoMouse position.
  if (!isOver(experiments, d) && !isOver(explainers, d * 1.5)) echoMouse();
}

function mouseClicked() {
  let key = 'foo';
  key = isOver(experiments, d);
  if (key) window.open(experiments[key][3], '_blank');
  key = isOver(explainers, d * 1.5);
  if (key) window.open(explainers[key][2], '_blank');
}
