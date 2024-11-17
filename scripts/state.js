export function getRandNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandColor() {
  const colours = ["CadetBlue", "Crimson", "Cornsilk", "DarkSeaGreen"];

  return colours[getRandNumber(0, colours.length - 1)];
}

// TIMER
let time = 0;
const gameTime = 30;
let countdownInterval = null;

export function startTimer(handlerTimer, handlerStopTimer) {
  time = gameTime;
  countdownInterval = setInterval(() => {
    if (time === 0) {
      stopTimer(handlerStopTimer);
      return;
    }
    handlerTimer(time);
    time--;
  }, 1000);
}

export function stopTimer(handlerStopTimer) {
  clearInterval(countdownInterval);
  handlerStopTimer();
}

// WINDOWS
let generatedWindows = [];

export function getGeneratedWindows() {
  return generatedWindows;
}

export function generateWindow(handlerOnClick) {
  let posX = getRandNumber(0, screen.width - 350);
  let posY = getRandNumber(0, screen.height - 200);

  let newWindow = window.open(
    "windowTemplate.html",
    "_blank",
    `width=350,height=200,top=${posY},left=${posX},resizable=no`
  );

  newWindow.addEventListener("load", () => {
    let color = setWindowColor(newWindow);

    newWindow.addEventListener("click", () => {
      handlerOnClick(color, newWindow);
      console.log(color);
    });

    newWindow.color = color;
  });

  // Ref window
  generatedWindows.push(newWindow);
}

export function closeWindow(windowToClose) {
  generatedWindows = generatedWindows.filter(
    (element) => element !== windowToClose
  );
  windowToClose.close();
}

export function setWindowColor(windowToSet) {
  let color = getRandColor();

  windowToSet.document.getElementById("color-name").innerText = color;

  windowToSet.document.body.style.backgroundColor = color;

  windowToSet.color = color;

  return color;
}
