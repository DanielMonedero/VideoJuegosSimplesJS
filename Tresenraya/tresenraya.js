/* Se define una constante 'cells' que contiene todos los elementos HTML que tienen la clase 'cell' */
const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let piezaArrastable = document.getElementById("arrastrable");
piezaArrastable.innerHTML = `Turno X`;

/* Se añade un evento 'dragover' y 'drop' a cada celda en 'cells' mediante un bucle forEach */
cells.forEach((cell) => {
  cell.addEventListener("dragover", dragOver);
  cell.addEventListener("drop", dragDrop);
});
/* Se define la función 'dragStart' que se ejecuta cuando comienza el arrastre de un elemento */
function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}
/* Se define la función 'dragOver' que se ejecuta cuando un elemento se arrastra sobre una celda */
function dragOver(event) {
  event.preventDefault();
}
/* Se define la función 'dragDrop' que se ejecuta cuando se suelta un elemento arrastrado sobre una celda */
function dragDrop(event) {
  const cell = event.target;
  const data = event.dataTransfer.getData("text");
/* Si la celda no tiene contenido, se añade el contenido de 'currentPlayer' y se cambia 'currentPlayer' a "O" si era "X" o viceversa */
  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayer === "X" ? piezaArrastable.innerHTML = `Turno X` : piezaArrastable.innerHTML = `Turno O`;
  }
/* Se comprueba si hay un ganador */
  checkWinner();
}
/* Se define la función 'checkWinner' que comprueba si hay un ganador */
function checkWinner() {
  /* Se define un array con todas las combinaciones ganadoras */
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
/* Si las celdas 'a', 'b' y 'c' tienen el mismo contenido, se muestra un mensaje de alerta con el jugador ganador y se reinicia el juego */
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {
      // He añadido un timeOut para que de tiempo a ver el tablero y no se borre nada mas soltar la pieza ganadora
      setTimeout(() => alert(`¡Jugador ${cells[a].textContent} gana!`), 500);
      setTimeout(() => resetGame(), 500);
      
    }
  }
/* Si todas las celdas tienen contenido y no hay ganador, se muestra un mensaje de alerta de empate y se reinicia el juego */

  if ([...cells].every((cell) => cell.textContent !== "") && cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
    // He añadido un timeOut para que de tiempo a ver el tablero completo y no se borre nada mas soltar la ultima pieza
    setTimeout(() => alert("¡¡EMPATE!!"), 500);
    setTimeout(() => resetGame(), 500);
    
  }
}
/* Se define la función 'resetGame' que reinicia el juego, vaciando todas las celdas y estableciendo 'currentPlayer' a "X" */
function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  currentPlayer = "X";
  piezaArrastable.innerHTML = `Turno X`;
}
