// Variables que se usarán en varias funciones
//Aquí se guarda la secuencia de luces correctas
let secuencia = [];
// Inicializamos el nivel a -1 para indicar que ahora mismo el juego está parado
let nivel = -1;
// Esta variable nos sirve para ir mostrando cada color del nivel actual. Por ejemplo si estamos en el nivel 5 esta variable se ejecutará 5 veces en ese nivel
let subnivel = 0;
// Este es el número máximo de niveles que se pueden hacer. He puesto 100 que creo que es un nivel que nadie alcanzará
const ultimo = 100;
// Las 3 siguientes variables indican el tiempo que durarán los eventos de encender luces, apargar luces y la espera entre un color y otro
const espera = 500;
const esperaMedia = 1000;
const eliminarBoton = 150;
// Numero de botones que tiene el tablero
const numColores = 9;
// Puntuación que obtendremos
let puntuacion = 0;


function iniciarJuego() {
    // Creamos la secuencia de botones que deben pulsarse
    secuencia = new Array(ultimo);
    // Con esta función llenamos el array de 0
    secuencia = secuencia.fill(0);
    // Con esta función asignamos los números del 1 al 9 a las 100 posiciones del array
    secuencia = secuencia.map(n => Math.floor(Math.random() * numColores));
    // Iniciamos el nivel 0
    nivel = 0;
    subnivel = 0;

    // Escondemos el botón de empezar añadiendolo a la clase hide, la cual está oculta desde CSS
    boton.classList.add('hide');

    // Mostramos la secuencia de botones. En este punto solo habrá  un botón
    iluminarSecuencia();
}


// Esta función se encarga de mostrar la secuencia del nivel actual
function iluminarSecuencia() {
    // Recorremos el array hasta el nivel actual
    for (let i = 0; i <= nivel; i++) {
        // Transformamos el número que tenemos en el array al botón que le corresponde
        const color = transformarNumeroAColor(secuencia[i]);
        // Iluminamos el color el tiempo marcado en las variables de tiempo. Le pasamos por parámetro el botón que debe iluminar y el tiempo que debe esèrar multiplicado por i ya que en los botones posteriores deberá esperar más para no iluminarse al mismo tiempo que sus predecesores
        setTimeout(() => iluminarColor(color), espera * i);
    }
}
// Esta función es la encargada de iluminar el color
function iluminarColor(color) {
    // Para ello añadimos el botón a la clase ligth, que cambiará el color del botón de transparente a un naranja translucido desde CSS
    colores[color].classList.add('light');
    // Cuando haya pasado el tiempo necesario llamamos a la función apargar botón que se encargará de sacarlo de la clase light
    setTimeout(() => apagarColor(color), eliminarBoton);
}
// Función que apaga el botón
function apagarColor(color) {
    // Para ello lo sacamos de la clase light, volviendo a su color inicial de transparente
    colores[color].classList.remove('light');
}
// Esta función se encarga de cambiar el número del array por su botón correspondiente
function transformarNumeroAColor(numero) {
    switch (numero) {
        // Devuelve el nombre del botón
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

// A partir de aquí empezamos con la parte que interactua con el usuario, ya que hasta ahora solo estabamos mostrando la secuencia
// Primero guardamos todos los botones en constantes
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
// Añadimos los botones a un array
const colores = {
    izAr, cenAr, derAr,
    izCen, cenCen, derCen,
    izAb, cenAb, derAb
}

// Creamos el evento de click, que llamará a la función elegirColor
colores.izAr.addEventListener('click', elegirColor);
colores.cenAr.addEventListener('click', elegirColor);
colores.derAr.addEventListener('click', elegirColor);
colores.izCen.addEventListener('click', elegirColor);
colores.cenCen.addEventListener('click', elegirColor);
colores.derCen.addEventListener('click', elegirColor);
colores.izAb.addEventListener('click', elegirColor);
colores.cenAb.addEventListener('click', elegirColor);
colores.derAb.addEventListener('click', elegirColor);

// Esta función se encarga de comprobar si el botón ya pulsado coincide con la secuencia o no
function elegirColor(ev) {
    // En caso que los botones se estén pulsando sin empezar la partida salimos de la función sin realizar nada
    if (nivel === -1) return;

    // He utilizado el atributo data-color para recuperar el nombre del botón activo. Se podría hacer con getElementByID pero no he sido capaz.
    const nombreColor = ev.target.dataset.color;
    // Ahora queremos saber en que posición del array está el botón pulsado. Basicamente la ingeniería inversa de la función creada para iluminar la secuencia
    const numeroColor = transformarColorANumero(nombreColor);
    // Volvemos a llamar a la función iluminarColor para darle feekback al usuario de que ha pulsado el botón
    iluminarColor(nombreColor);

    // Ahora comprobamos que esté correcto
    if (numeroColor === secuencia[subnivel]) {
        // Como ha acertado subimos el subinvel al siguiente
        subnivel++;

        // En caso de que este nivel esté completo aumentamos el contador y pasamos al siguiente nivel
        if (subnivel > nivel) {
            // siguiente nivel
            nivel++;
            puntuacion++;
            // Si por algún casual hemos llegado al último nivel terminamos el juego
            if (nivel === ultimo) {
                alert("Are u using hacks???");
                terminarJuego();
            }
            else {
                // En caso contrario reseteamos el subnivel a 0 y mostramos la siguiente secuencia
                subnivel = 0;
                setTimeout(iluminarSecuencia, esperaMedia);
            }
        }
    }
    else {
        // En caso de fallar el botón imprimimos la puntuación y terminamos el juego
        alert("Has conseguido " + puntuacion + " puntos!!");
        terminarJuego();
        // También restablecemos la puntuacióna  0 para la próxima partida
        puntuacion = 0;
    }
}
// Esta función recupera el número del array del botón pulsado
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

// Esta función termina el juego
function terminarJuego() {
    // Volvemos  amostrar el botón mostrar
    boton.classList.remove('hide');
    nivel = -1;
}