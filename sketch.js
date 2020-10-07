// Creates a wall drawing in your name. Type your name (or a word) in the input box. Only alphabets and space is allowed as of now. Click remix for a different palette. The colors are from works by famous painters.

let colors,
  name,
  lineLength = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(28, 28, 28);
  frameRate(4);

  colors = [
    // [color('#FD0C81'), color('#FFED4D'), color('#272324'), color('#C34582'), color('#EBA49E')],
    [
      color("#2C458D"),
      color("#E4DFD9"),
      color("#425B4F"),
      color("#EBAD30"),
      color("#BF2124")
    ]
    // [color('#1A6DED'), color('#2C7CE6'), color('#145CBF'), color('#162B3D'), color('#F9ECE4')],
    // [color('#C00559'), color('#DE1F6C'), color('#F3A20D'), color('#F07A13'), color('#DE6716')],
    // [color('#7A989A'), color('#849271'), color('#C1AE8D'), color('#CF9546'), color('#C67052')],
    // [color('#C8B272'), color('#A88B4C'), color('#A0A584'), color('#697153'), color('#43362A')],
    // [color('#4368B6'), color('#78A153'), color('#DEC23B'), color('#E4930A'), color('#C53211')],
    // [color('#21344F'), color('#8AAD05'), color('#E2CE1B'), color('#DF5D22'), color('#E17976')],
  ];

  prompt = createElement("h2", "What is your full name?");
  prompt.position(50, 0);
  prompt.style("color", "#fff");

  name = createInput();
  name.position(prompt.x, 60);
  createBtn = createButton("Submit");
  createBtn.position(name.x + name.width, 60);
  createBtn.mousePressed(draw);
}

function draw() {
  background(28, 28, 28);

  var input = name.value();

  if (name.value() == "") {
    prompt.html("A wall has no name :(");
  } else {
    prompt.html("Hello, " + input + "!");
    createBtn.html("Remix");

    resetBtn = createButton("Reset");
    resetBtn.position(createBtn.x + createBtn.width, 60);
    resetBtn.mousePressed(resetAll);
  }
  var spacebar = 0;

  //checks for non characters and counts the number of letters and spaces
  for (var i = 0; i < input.length; i++) {
    var c = input.charCodeAt(i);

    if (c == 32) {
      append(lineLength, 0);
      spacebar += 1;
    }
    if (64 < c && c < 91) {
      append(lineLength, (c - 64) * ((height - 100) / 26));
    }
    if (96 < c && c < 123) {
      append(lineLength, (c - 96) * ((height - 100) / 26));
    }
    if (c < 32 || (32 < c && c < 65) || (90 < c && c < 97) || c > 122) {
      prompt.html("Dont use Symbols :)");
      input = "";
      break;
    }
  }

  spacer = (width - 100) / (lineLength.length - spacebar - 1);
  var palette = random(colors);

  for (var j = 0; j < lineLength.length; j++) {
    strokeWeight(0);
    fill(random(palette));

    if (lineLength[j + 1] != 0) {
      // line(50, (height / 2) - (lineLength[j] / 2), 50+space, (height / 2) - (lineLength[j+1] / 2));
      // line(50, (height / 2) +(lineLength[j] / 2),50+space, (height / 2) + (lineLength[j+1] / 2));

      // quad(50, (height / 2) - (lineLength[j] / 2), 50 + spacer, (height / 2) - (lineLength[j + 1] / 2), 50 + spacer, (height / 2) + (lineLength[j + 1] / 2), 50, (height / 2) + (lineLength[j] / 2));

      for (var k = 0; k < 100; k++) {
        stroke(random(palette));
        strokeWeight(1);
        line(
          50,
          random(
            height / 2 - lineLength[j] / 2,
            height / 2 + lineLength[j] / 2
          ),
          50 + spacer,
          random(
            height / 2 - lineLength[j + 1] / 2,
            height / 2 + lineLength[j + 1] / 2
          )
        );
      }
    } else {
      // quad(50, (height / 2) - (lineLength[j] / 2), 50 + spacer,(height / 2) + (lineLength[j + 2] / 2), 50 + spacer, (height / 2) - (lineLength[j + 2] / 2), 50,(height / 2) + (lineLength[j] / 2));

      for (var k = 0; k < 200; k++) {
        stroke(random(palette));
        strokeWeight(1);
        line(
          50,
          random(
            height / 2 - lineLength[j] / 2,
            height / 2 + lineLength[j] / 2
          ),
          50 + spacer / 2,
          random(
            height / 2 - lineLength[j + 1] / 2,
            height / 2 + lineLength[j + 1] / 2
          )
        );
      }
      j += 1;
    }

    if (lineLength[j] == 0) {
      for (var k = 0; k < 200; k++) {
        stroke(random(palette));
        strokeWeight(1);
        line(
          50 + spacer / 2,
          random(
            height / 2 - lineLength[j] / 2,
            height / 2 + lineLength[j] / 2
          ),
          50 + spacer,
          random(
            height / 2 - lineLength[j + 1] / 2,
            height / 2 + lineLength[j + 1] / 2
          )
        );
      }
    }
    noStroke();
    translate(spacer, 0);
  }
  lineLength = [];
}

function resetAll() {
  background(28, 28, 28);
  name.value("");
  lineLength = [];
  createBtn.html("Submit");
}

//Thanks to
// http://colorlisa.com/   - for the color palettes
