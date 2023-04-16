/*ponemos todas la varables que vamos a necesitar*/
var resultElem = {},
    currentStatus = {},
    selectedWord = '',
    numberOfTries = 0,
    numberOfFound = 0,
    totalRights = 7;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/* Esta función comprueba si la letra seleccionada por el usuario coincide con alguna de las letras de la palabra seleccionada */
function check() {
    var currentValue = this.textContent,
        found = false;
    /* Este bucle compara cada letra de la palabra seleccionada con la letra seleccionada por el usuario */
    for (var index = 0, length = selectedWord.length; index < length; index++) {
        /* Si se encuentra una letra, se muestra en el campo correspondiente */
        if (selectedWord[index] == currentValue) {
            document.getElementsByTagName('input')[index].value = currentValue;
            found = true;
            /* Se incrementa el número de letras encontradas */
            numberOfFound++;
        }
    }
    /* Si se han encontrado todas las letras, se indica que el usuario ha ganado y se desactivan los botones */
    if (numberOfFound == selectedWord.length) {
        resultElem.textContent = '¡¡¡HAS GANADO!!!';
        return disableButtons(document.getElementsByTagName('buttons'));
    }
    /* Si no se ha encontrado la letra seleccionada, se desactiva el botón correspondiente y se actualiza el estado del juego. Si se han agotado los intentos, se desactivan todos los botones y se muestra la solución. */
    this.disabled = true;

    if (found === false) {
        numberOfTries++;
        currentStatus.src = 'status_' + numberOfTries + '.gif';

        var resultText = 'Has fallado ' + numberOfTries + ' '
        resultText += '<br />';
        resultText += 'Tienes ' + (totalRights - numberOfTries) + ' intentos.';
        resultElem.innerHTML = resultText;

        if (numberOfTries == totalRights) {
            disableButtons(document.getElementsByTagName('buttons'));
            document.getElementById('buttons').appendChild(buttonFragment);

        }
    }
}
/* Esta función desactiva los botones pasados como argumento. */
function disableButtons(buttons) {
    for (var index = 0, length = buttons.length; index < length; index++) {
        buttons[index].disabled = true;
    }
}
/* Esta función inicializa los elementos necesarios para el juego, como la palabra y los campos de entrada y botones. */
function initElement() {
    resultElem = document.getElementById('results');
    currentStatus = document.getElementById('current-status');
    // Inicializar variables de alfabeto y palabras
    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var words = ['lenguaje', 'anacleto', 'tigre', 'esternon', 'codigofacilito', 'inteligencia', 'badbunny'];
    var position = randomNumber(0, words.length);
    selectedWord = words[position].toUpperCase();
    // Crear campos de entrada
    var inputFragment = document.createDocumentFragment();
    for (var index = 0, length = selectedWord.length; index < length; index++) {
        var newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.maxLength = 1;
        newInput.readOnly = true;
        inputFragment.appendChild(newInput);
    }
    document.getElementById('inputs').appendChild(inputFragment);
    // Crear botones
    var buttonFragment = document.createDocumentFragment();
    for (var index = 0; index < alphabet.length; index++) {
        var newButton = document.createElement('button');
        newButton.textContent = alphabet[index];
        newButton.addEventListener('click', check);
        buttonFragment.appendChild(newButton);
    }
    document.getElementById('buttons').appendChild(buttonFragment);

}

function init() {
    initElement();
    document.getElementById('restart-btn').addEventListener('click', restartGame);
}
function restartGame() {
    // Reiniciar resultados
    resultElem.textContent = '';
    resultElem.innerHTML = '';
    currentStatus.src = 'status_0.gif';

    // Habilitar botones de letras nuevamente
    var buttons = document.querySelectorAll('#buttons button');
    buttons.forEach(function (button) {
        button.disabled = false;
    });

    // Reiniciar variables
    selectedWord = '';
    numberOfTries = 0;
    numberOfFound = 0;

    // Crear una nueva palabra y campos de entrada
    var inputFields = document.getElementById('inputs');
    inputFields.innerHTML = '';
    var buttonFields = document.getElementById('buttons');
    buttonFields.innerHTML = '';

    initElement();
}



window.addEventListener('DOMContentLoaded', init);