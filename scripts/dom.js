export function showInitialSection() {
  document.querySelector(".section__initial").style.display = "block";
  document.querySelector(".section__game").style.display = "none";
  document.querySelector(".section__final").style.display = "none";
  document.querySelector(".stats").style.display = "block";
}

export function showGameSection() {
  document.querySelector(".section__initial").style.display = "none";
  document.querySelector(".section__game").style.display = "block";
  document.querySelector(".section__final").style.display = "none";
  document.querySelector(".stats").style.display = "none";
}

export function showFinalSection() {
  document.querySelector(".section__initial").style.display = "none";
  document.querySelector(".section__game").style.display = "none";
  document.querySelector(".section__final").style.display = "block";
  document.querySelector(".stats").style.display = "none";
}

export function updateTime(timeNumber) {
  document.querySelector(".timer").textContent = timeNumber;
}

export function handleOnClickStart(handler) {
  document.querySelector(".btn-start").addEventListener("click", () => {
    handler();
  });
}