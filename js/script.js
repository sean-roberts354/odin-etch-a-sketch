function deleteSketchPad() {
      let sketchPad = document.querySelector(".sketch-pad");
      let sketchPadBoxes = document.querySelectorAll(".sketch-pad-box");

      sketchPadBoxes.forEach((box) => {
            sketchPad.removeChild(box);
      })
}

function generateSketchPad(length, width) {
      deleteSketchPad();
      let area = length * width;

      let sketchPad = document.querySelector(".sketch-pad");
      sketchPad.style.visibility="visible";
      document.querySelector(".instructions").style.display="none";

      for (let i = 0; i < area; i++) {
            let sketchPadBox = document.createElement("div");
            sketchPadBox.classList.add("sketch-pad-box");
            sketchPadBox.setAttribute("draggable", "false");
            sketchPadBox.addEventListener("mousemove", (e) => {
                  if (e.buttons == 0) {
                        return;
                  } else if (e.buttons == 1) {
                        let color = getPaintColor();
                        drawInBox(e.target, color);
                  }
            });
            sketchPad.appendChild(sketchPadBox);
      }

      sketchPad.style.gridTemplateColumns=`repeat(${length}, auto`;
      sketchPad.style.gridTemplateRows=`repeat(${width}, auto)`;

      if (isOverflown()) {
            if(confirm("You're sketch pad is too large for your screen. Would you like to continue anyway?") == false) {
                  reset();
            }
      }
}

function isOverflown() {
      let body = document.querySelector("body");
      return body.scrollHeight > body.clientHeight || body.scrollWidth > body.clientWidth;
}

function changePaintColor(clicked) {
      let colors = document.querySelectorAll(".color");
      colors.forEach((color) => {
            color.classList.remove("active");
      })

      clicked.classList.add("active");
}

function getPaintColor() {
      return document.querySelector(".active").style.backgroundColor;
}

function drawInBox(box, color) {
      box.style.backgroundColor = color;
}

function clearSketchPad() {
      let sketchPadBoxes = document.querySelectorAll(".sketch-pad-box");
      sketchPadBoxes.forEach((box) => {
            box.style.backgroundColor = "inherit";
      })
}

function reset() {
      generateSketchPad(0, 0);
      document.querySelector(".sketch-pad").style.visibility = "hidden";
      document.querySelector(".instructions").style.display = "block";
      document.querySelector("#input-length").value = "";
      document.querySelector("#input-width").value = "";
}


document.querySelector("#generate-sketch-pad").addEventListener("click", () => {
      let length = (parseInt(document.querySelector("#input-length").value)) / 10;
      let width = (parseInt(document.querySelector("#input-width").value)) / 10;

      if (isNaN(length) || isNaN(width)) {
            alert("You must enter a number for length and width");
            return;
      } else {
            generateSketchPad(length, width);
      }
});

document.querySelectorAll(".color").forEach((color) => {
      color.addEventListener("click", (e) => {
            changePaintColor(e.target);
      })
});

document.querySelector("#clear-sketch-pad").addEventListener("click", clearSketchPad);

document.querySelector("#reset").addEventListener("click", reset);