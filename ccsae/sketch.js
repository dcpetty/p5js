/*
 * CCSAE
 */
const d = 30;
const explainers = {
  'a': [240, 035, ],
  'b': [400, 100, ],  // [375, 130, ],
  'c': [050, 215, ],
  'd': [225, 235, ],
  'e': [400, 235, ],
  'f': [500, 235, ],
  'g': [500, 335, ],
  'h': [320, 430, ],
  'i': [465, 430, ],
  'j': [130, 555, ],
  'k': [240, 555, ],
  'l': [480, 555, ],
  'm': [210, 770, ],
  'n': [350, 770, ],
};
const experiments = {
   1: [130, 105, 'ac', ],
   2: [315, 075, 'ab', ],  // [315, 090, 'ab', ],
   3: [320, 180, 'bd', ],
   4: [400, 180, 'be', ],  // [385, 180, 'be', ],
   5: [455, 180, 'bf', ],
   6: [320, 235, 'de', ],
   7: [295, 280, 'di', ],
   8: [385, 280, 'el', ],
   9: [475, 280, 'fh', ],
  10: [525, 280, 'fg', ],
  11: [285, 335, 'dh', ],
  12: [585, 335, 'bl', ],
  13: [025, 375, 'cm', ],
  14: [120, 375, 'dj', ],
  15: [170, 375, 'dm', ],
  16: [215, 375, 'dk', ],
  17: [490, 380, 'gi', ],
  18: [400, 495, 'im', ],
  19: [400, 550, 'lk', ],
  20: [145, 615, 'jm', ],
  21: [220, 615, 'km', ],
  22: [295, 615, 'kn', ],
  23: [355, 590, 'hn', ],
  24: [400, 615, 'lm', ],
  25: [425, 615, 'ln', ],
  26: [265, 770, 'mn', ],
};

function path(v, d) {
  const [x, y, p] = v;
  const [s, e] = p, [sx, sy] = explainers[s], [ex, ey] = explainers[e];
  push();
  noFill();
  stroke('#639');
  strokeWeight(2);
  // Draw connection.
  beginShape();
  curveVertex(sx, sy);
  curveVertex(sx, sy);
  curveVertex(x, y);
  curveVertex(ex, ey);
  curveVertex(ex, ey);
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
  ellipse(x, y, d);
  fill(0);
  textAlign(CENTER, CENTER);
  text(k, x, y);
  pop();
}

function echoMouse() {
  push();
  fill(0);
  textAlign(CENTER, CENTER);
  if (mouseX > d / 2 && mouseY > d / 2)
    text(`(${mouseX}, ${mouseY})`, mouseX, mouseY);
  pop();
}

function setup() {
  createCanvas(600, 800);
}

function draw() {
  clear();
  background(240);
  // Draw paths for each experiment.
  for (const [key, value] of Object.entries(experiments)) {
    path(value, d * 1.5);
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
  echoMouse();
}

function mouseClicked() {
  window.open('https://google.com/', '_self');
}