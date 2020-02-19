"use strict";

let timedFunc;
function getRandomNumber(i, clicked) {
  const delay = parseInt(document.getElementById("delay").value);
  const resultText = document.getElementById("resultText");
  const resultColor = document.getElementById("resultColor").value;
  const fontSize = document.getElementById("fontSize").value;
  const stopOperationBtn = document.getElementById("stopOperationBtn");
  const startOperationBtn = document.getElementById("startOperationBtn");

  const style = {
    resultColor: resultColor || "green",
    fontSize: fontSize || 16
  };

  if (clicked) {
    disableInputs(true);
    resultText.style.color = "#444";
    resultText.style.fontSize = style.fontSize + "px";
  }

  if (delay && i < delay) {
    resultText.innerText = delay - i;
    stopOperationBtn.style.display = "block";
    startOperationBtn.style.display = "none";
    timedFunc = setTimeout(function() {
      i++;
      getRandomNumber(i);
      return;
    }, 1000);
  } else {
    const minNumber = parseInt(document.getElementById("minNumber").value);
    const maxNumber = parseInt(document.getElementById("maxNumber").value);
    const hideResult = document.getElementById("hideResult").value;

    disableInputs(false);
    stopOperation();

    if (hideResult === "yes") {
      document.getElementById("hideResultBtn").style.visibility = "visible";
      resultText.style.display = "none";
    }

    resultText.innerText = Math.round(
      Math.random() * (maxNumber - minNumber) + minNumber
    );

    resultText.style.color = style.resultColor;
  }
}

function onNumChange() {
  const maxNumber = parseInt(document.getElementById("maxNumber").value);
  const minNumber = parseInt(document.getElementById("minNumber").value);

  if (maxNumber < 2) document.getElementById("maxNumber").value = 2;

  if (minNumber < 1 || minNumber >= maxNumber) {
    let newMin = maxNumber - 1 > 0 ? maxNumber - 1 : 1;
    document.getElementById("minNumber").value = newMin;
  }
}

function disableInputs(disabled) {
  const inputs = document.getElementsByClassName("input");
  let i = 0;

  for (i; i < inputs.length; i++) {
    disabled
      ? inputs[i].setAttribute("disabled", true)
      : inputs[i].removeAttribute("disabled");
  }
}

function showResult() {
  document.getElementById("resultText").style.display = "inherit";
  document.getElementById("hideResultBtn").style.visibility = "hidden";
}

function stopOperation() {
  const stopOperationBtn = document.getElementById("stopOperationBtn");
  const startOperationBtn = document.getElementById("startOperationBtn");
  stopOperationBtn.style.display = "none";
  startOperationBtn.style.display = "block";
  document.getElementById("hideResultBtn").style.visibility = "hidden";
  resultText.innerText = "";
  clearTimeout(timedFunc);
  disableInputs(false);
}
