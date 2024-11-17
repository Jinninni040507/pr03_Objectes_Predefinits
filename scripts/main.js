import * as dom from "./dom.js";
import * as state from "./state.js";

dom.showInitialSection();

let firstWindowClicked = null;
let firstColor = "";

function startGame() {
  dom.showGameSection();

  for (let index = 0; index < 5; index++) {
    state.generateWindow(handleClickWindow);
  }

  state.startTimer(
    (time) => {
      dom.updateTime(time);
    },
    () => {
      dom.showFinalSection();
    }
  );
}

function handleClickWindow(clickedColor, clickedWindow) {
  if (!firstWindowClicked) {
    firstWindowClicked = clickedWindow;
    firstColor = clickedColor;
    return;
  }

  if (firstColor !== clickedColor) {
    return;
  }

  if (firstWindowClicked !== clickedWindow) {
    state.closeWindow(firstWindowClicked);
    state.closeWindow(clickedWindow);

    if (!state.getGeneratedWindows()) {
      state.stopTimer();
      dom.showFinalSection();
    }
    return;
  }

  state.generateWindow(handleClickWindow);
  state.setWindowColor(clickedWindow);
}

dom.handleOnClickStart(startGame);
