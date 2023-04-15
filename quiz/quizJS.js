// Array con las preguntas y respuestas
const questions = [
    {
        question: '¿Cuál es la capital de Francia?',
        answers: ['Madrid', 'Londres', 'París', 'Roma'],
        correctAnswer: 2
    },
    {
        question: '¿Cuál es el animal más grande del mundo?',
        answers: ['Elefante', 'Ballena', 'Girafa', 'Hipopótamo'],
        correctAnswer: 1
    },
    {
        question: '¿Cuál es el continente más grande?',
        answers: ['Asia', 'África', 'América', 'Europa'],
        correctAnswer: 0
    },
    {
        question: '¿Cuál es el océano más grande?',
        answers: ['Atlántico', 'Pacífico', 'Índico', 'Antártico'],
        correctAnswer: 1
    },
    {
        question: '¿Cuál es el símbolo químico del hierro?',
        answers: ['He', 'Ir', 'Fe', 'Cu'],
        correctAnswer: 2
    },
    {
        question: '¿Cuál es el metal más valioso?',
        answers: ['Plata', 'Oro', 'Cobre', 'Hierro'],
        correctAnswer: 1
    },
    {
        question: '¿Qué famoso personaje de Disney vive con siete enanitos?',
        answers: ['Mickey Mouse', 'Goofy', 'Pato Donald', 'Blanca Nieves'],
        correctAnswer: 3
    },
    {
        question: '¿Cuál es el país más grande del mundo en términos de superficie?',
        answers: ['Canadá', 'Rusia', 'China', 'Estados Unidos'],
        correctAnswer: 1
    },
    {
        question: '¿Cuál es la capital de Australia?',
        answers: ['Melbourne', 'Sídney', 'Brisbane', 'Canberra'],
        correctAnswer: 3
    },
    {
        question: '¿Quién es el autor de la famosa novela "Don Quijote de la Mancha"?',
        answers: ['Miguel de Cervantes', 'Lope de Vega', 'Federico García Lorca', 'Pedro Calderón de la Barca'],
        correctAnswer: 0
    }  
];

// Variables del quiz
let currentQuestion = 0;
var score = 0;
let timeLeft = 60;
let timerInterval;

// Función para mostrar la siguiente pregunta
function nextQuestion() {
    // Comprobar si hay más preguntas
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }
    // Resetear la respuesta
    document.querySelector('.answer').innerHTML = '';

    // Mostrar la pregunta actual
    document.querySelector('.question').innerHTML = questions[currentQuestion].question;

    // Mostrar las opciones de respuesta
    const answers = questions[currentQuestion].answers;
    let answerHtml = '';
    for (let i = 0; i < answers.length; i++) {
        answerHtml += `<div><input type="radio" name="answer" value="${i}"> ${answers[i]}</div>`;
    }
    document.querySelector('.answer').innerHTML = answerHtml;

    // Añadir el botón de siguiente o finalizar
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        document.querySelector('.button').innerHTML = 'Finalizar';
    }
}

// Función para comprobar la respuesta
function checkAnswer() {
    console.log(score)
    // Comprobar si hay una respuesta seleccionada
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer == null) {
        console.log(selectedAnswer)
        return;
    }

    // Comprobar si la respuesta es correcta
    const selectedAnswerValue = Number(selectedAnswer.value);
    const correctAnswer = questions[currentQuestion - 1].correctAnswer;
    console.log(selectedAnswerValue)
    console.log(score)
    console.log(correctAnswer)
    if (selectedAnswerValue == correctAnswer) {
        score++;
    }

    // Deshabilitar las respuestas para evitar seleccionar varias respuestas
    const answerRadios = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < answerRadios.length; i++) {
        answerRadios[i].disabled = true;
    }

    // Mostrar la puntuación actual
    document.querySelector('.score').innerHTML = `Puntuación: ${score}`;

    // Pasar a la siguiente pregunta
    nextQuestion();
}



// Función para finalizar el quiz
function endQuiz() {
    // Parar el temporizador
    clearInterval(timerInterval);

    // Ocultar las opciones de respuesta y el botón de siguiente
    document.querySelector('.answer').innerHTML = '';
    document.querySelector('.button').style.display = 'none';
}

// Función para actualizar el temporizador
function updateTimer() {
    timeLeft--;
    document.querySelector('.timer').innerHTML = `Tiempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
        endQuiz();
    }
}

// Inicializar el quiz
nextQuestion();
document.querySelector('.button').addEventListener('click', checkAnswer);
timerInterval = setInterval(updateTimer, 1000);

