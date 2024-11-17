import * as dom from "./dom.js";
import * as state from "./state.js";

dom.showInitialSection();

let firstWindowClicked = null;

function startGame() {
  firstWindowClicked = null;

  dom.showGameSection();

  for (let index = 0; index < 7; index++) {
    state.generateWindow(handleClickWindow);
  }

  state.startTimer(
    (time) => {
      dom.updateTime(time);
    },
    () => {
      state.resetGeneratedWindowsArray();
      dom.showFinalSection();
    }
  );
}

function stopGame() {
  dom.showFinalSection();

  state.resetGeneratedWindowsArray();
}

function endGame() {
  dom.showInitialSection();
}

function resetWindowColorClicked() {
  firstWindowClicked = null;
  firstColor = "";
}

function handleClickWindow(clickedColor, clickedWindow) {
  if (!firstWindowClicked) {
    firstWindowClicked = clickedWindow;
    console.log(firstWindowClicked);
    return;
  }

  if (firstWindowClicked.color !== clickedWindow.color) {
    resetWindowColorClicked();
    return;
  }

  if (firstWindowClicked !== clickedWindow) {
    state.closeWindow(firstWindowClicked);
    state.closeWindow(clickedWindow);
    resetWindowColorClicked();

    if (!state.getGeneratedWindows().length) {
      state.resetGeneratedWindowsArray();
      state.stopTimer();
      dom.showFinalSection();
    }

    return;
  }

  resetWindowColorClicked();

  state.generateWindow(handleClickWindow);
  state.setWindowColor(clickedWindow);
}

dom.handleOnClickStart(startGame);

dom.handleOnClickPlayAgain(startGame);

dom.handleOnClickStop(stopGame);

dom.handleOnClickEnd(endGame);
