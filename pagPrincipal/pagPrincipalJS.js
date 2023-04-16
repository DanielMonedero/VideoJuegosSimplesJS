//Obtenemos los botones correspondientes a cada juego//
const juego1Button = document.getElementById("juego1");
const juego2Button = document.getElementById("juego2");
const juego3Button = document.getElementById("juego3");
const juego4Button = document.getElementById("juego4");
const randomButton = document.getElementById("random");

//Asignamos un evento de click para redirigir a la página de cada juego//
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
//Asignamos un evento de click para redirigir a una página aleatoria de juego//
randomButton.addEventListener("click", () => {
  const juegos = ["../quiz/quiz.html", "../simonDice/simonDice.html", "../ahorcado/ahorcado.html","../Tresenraya/tresenraya.html"];
  const randomIndex = Math.floor(Math.random() * juegos.length);
  window.location.href = juegos[randomIndex];
});
