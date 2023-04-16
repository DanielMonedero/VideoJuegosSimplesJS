const juego1Button = document.getElementById("juego1");
const juego2Button = document.getElementById("juego2");
const juego3Button = document.getElementById("juego3");
const juego4Button = document.getElementById("juego4");
const randomButton = document.getElementById("random");

juego1Button.addEventListener("click", () => {
  window.location.href = "../quiz/quiz.html";
});

juego2Button.addEventListener("click", () => {
  window.location.href = "../simonDice/simonDice.html";
});

juego3Button.addEventListener("click", () => {
  window.location.href = "../Ahorcado/Ahorcado.html";
});

juego4Button.addEventListener("click", () => {
  window.location.href = "../Tresenraya/tresenraya.html";
});

randomButton.addEventListener("click", () => {
  const juegos = ["../quiz/quiz.html", "../simonDice/simonDice.html", "../ahorcado/ahorcado.html"];
  const randomIndex = Math.floor(Math.random() * juegos.length);
  window.location.href = juegos[randomIndex];
});
