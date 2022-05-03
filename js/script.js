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

      for (let i = 0; i < area; i++) {
            let sketchPadBox = document.createElement("div");
            sketchPadBox.classList.add("sketch-pad-box");
            sketchPad.appendChild(sketchPadBox);
      }

      sketchPad.style.gridTemplateColumns=`repeat(${length}, auto`;
      sketchPad.style.gridTemplateRows=`repeat(${width}, auto)`;
}

document.querySelector("#generate-sketch-pad").addEventListener("click", () => {
      let length = parseInt(document.querySelector("#input-length").value);
      let width = parseInt(document.querySelector("#input-width").value);

      if (isNaN(length) || isNaN(width)) {
            alert("You must enter a number for length and width");
            return;
      } else {
            generateSketchPad(length, width);
      }      

      console.log(length);
      console.log(width);
})