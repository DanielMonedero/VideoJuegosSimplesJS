///https://maestrosdelcodigo.com/aprende-programar-simon-javascript/

let secuencia = [];
let nivel = -1;
let subnivel = 0;
const ultimo = 100;
const espera = 750;
const esperaMedia = 1500;
const eliminarBoton = 350;
const numColores = 9;
let puntuacion = 0;


function iniciarJuego() {
    // creamos la secuencia para los botones
    secuencia = new Array(ultimo);
    secuencia = secuencia.fill(0);
    secuencia = secuencia.map(n => Math.floor(Math.random() * numColores));
    nivel = 0;
    subnivel = 0;

    // preparamos la interfaz
    boton.classList.add('hide');

    // mostramos la primer secuencia del luego
    iluminarSecuencia();
}


// muestra en pantalla la secuencia actual
function iluminarSecuencia() {
    for (let i = 0; i <= nivel; i++) {
        const color = transformarNumeroAColor(secuencia[i]);
        setTimeout(() => iluminarColor(color), espera * i);
    }
}
// ilumina el color especificado
function iluminarColor(color) {
    colores[color].classList.add('light');
    setTimeout(() => apagarColor(color), eliminarBoton);
}
// apaga el botón especificado
function apagarColor(color) {
    colores[color].classList.remove('light');
}
// recupera el color utilizando la posición indicada
function transformarNumeroAColor(numero) {
    switch (numero) {
        case 0: return 'izAr';
        case 1: return 'cenAr';
        case 2: return 'derAr';
        case 3: return 'izCen';
        case 4: return 'cenCen';
        case 5: return 'derCen';
        case 6: return 'izAb';
        case 7: return 'cenAb';
        case 8: return 'derAb';
    }
}

const boton = document.getElementById('btnEmpezar');
const izAr = document.getElementById('izAr');
const cenAr = document.getElementById('cenAr');
const derAr = document.getElementById('derAr');
const izCen = document.getElementById('izCen');
const cenCen = document.getElementById('cenCen');
const derCen = document.getElementById('derCen');
const izAb = document.getElementById('izAb');
const cenAb = document.getElementById('cenAb');
const derAb = document.getElementById('derAb');
const colores = {
    izAr, cenAr, derAr,
    izCen, cenCen, derCen,
    izAb, cenAb, derAb
}

colores.izAr.addEventListener('click', elegirColor);
colores.cenAr.addEventListener('click', elegirColor);
colores.derAr.addEventListener('click', elegirColor);
colores.izCen.addEventListener('click', elegirColor);
colores.cenCen.addEventListener('click', elegirColor);
colores.derCen.addEventListener('click', elegirColor);
colores.izAb.addEventListener('click', elegirColor);
colores.cenAb.addEventListener('click', elegirColor);
colores.derAb.addEventListener('click', elegirColor);

// al hacer clic en un botón, evalúa si la secuencia es correcta
function elegirColor(ev) {
    // si el juego no está activo, salimos
    if (nivel === -1) return;

    // recupera el nombre del color activo
    const nombreColor = ev.target.dataset.color;
    // averiguamos su posición
    const numeroColor = transformarColorANumero(nombreColor);
    // mostramos el color en pantalla para confirmar la lectura
    iluminarColor(nombreColor);

    // si el botón presionado es el mismo en la secuencia
    if (numeroColor === secuencia[subnivel]) {
        // pasamos a la siguiente secuencia
        subnivel++;
        
        // si nos hemos quedado sin secuencia, pasamos al siguiente nivel
        if (subnivel > nivel) {
            // siguiente nivel
            nivel++;
            puntuacion++;
            // si ya hemos llegado al final del juego
            if (nivel === ultimo) {
                alert("Are u using hacks???");
                terminarJuego();
            }
            else {
                // reseteamos para que la próxima vez valide desde 
                // el principio de la secuencia
                subnivel = 0;
                // mostramos la siguiente secuencia
                setTimeout(iluminarSecuencia, esperaMedia);
            }
        }
    }
    else {
        alert("Has conseguido " + puntuacion + " puntos!!");
        terminarJuego();
        puntuacion = 0;
    }
}
// recupera la posición a través del color indicado
function transformarColorANumero(color) {
    switch (color) {
        case 'izAr': return 0;
        case 'cenAr': return 1;
        case 'derAr': return 2;
        case 'izCen': return 3;
        case 'cenCen': return 4;
        case 'derCen': return 5;
        case 'izAb': return 6;
        case 'cenAb': return 7;
        case 'derAb': return 8;
    }
}

function terminarJuego() 
{
    boton.classList.remove('hide');
    nivel = -1;
}