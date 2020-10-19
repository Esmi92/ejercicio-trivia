// Primero as always llamas al axios que similar a requests(callback), pero aqui son promesas
import axios from "axios";
//siempre se llama el scss
import "./styles/style.scss"


//------------Ejercicio------------------

// Siempre son 10 preguntas
// Se puede modificar la dificultad
// Se puede seleccionar el tipo de respuesta
// Y se puede escoger la categoría.

// Una vez seleccionado las parámetros se crea la trivia
// Se deben mostrar las preguntas
// Se deben mostrar las posibles respuestas
// Se deben de contestar
// Cada pregunta correcta vale 100 puntos (Mostrar puntaje final)
// Botón de crear nueva trivia

// ....................................................................

var theApi = ''
var theData = ''
var score = 0

function createTest() {
    const form = document.querySelector('#form')
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const categoria = document.getElementById("categoria")
        const difficulty = document.getElementById("difficulty")
        const answerType = document.getElementById("answerType")
        console.log(categoria.value)
        console.log(difficulty.value)
        console.log(answerType.value)

        theApi = `https://opentdb.com/api.php?amount=10&category=${categoria.value}&difficulty=${difficulty.value}&type=${answerType.value}`
        console.log(theApi)

        axios.get(theApi)
            .then((reponse) => {
                console.log(reponse.status)
                theData = reponse.data.results
                console.log(theData)

                const questions = document.querySelector('#allQuestions')

                for (let i = 0; i < 10; i++) {
                    const correct = theData[i].correct_answer
                    const incorrectOne = theData[i].incorrect_answers[0]
                    const incorretTwo = theData[i].incorrect_answers[2]
                    const incorretThree = theData[i].incorrect_answers[3]

                    const preguntas = document.createElement('form')
                    preguntas.setAttribute('id', `pregunta${i}`)
                    questions.appendChild(preguntas)
                    const dataQuestion = theData[i].question
                    const pregunta = document.createElement('label')
                    pregunta.classList.add('my-3')
                    pregunta.innerHTML = dataQuestion
                    preguntas.appendChild(pregunta)

                    if (theData[i].type == 'boolean') {
                        const itsTrue = document.createElement('div')
                        itsTrue.classList.add('form-check')
                        itsTrue.innerHTML =
                            `<input class="form-check-input" type="radio" name="exampleRadios" id="bool0${i}" value="True"> <label class="form-check-label" for="exampleRadios1"> TRUE </label>`
                        preguntas.appendChild(itsTrue)

                        const itsFalse = document.createElement('div')
                        itsFalse.classList.add('form-check')
                        itsFalse.innerHTML =
                            `<input class="form-check-input" type="radio" name="exampleRadios" id="bool1${i}" value="False"> <label class="form-check-label" for="exampleRadios2"> FALSE </label>`
                        preguntas.appendChild(itsFalse)

                    } else {

                        const answers = []
                        answers.push(correct)
                        answers.push(incorrectOne)
                        answers.push(incorretTwo)
                        answers.push(incorretThree)

                        const order = [[0, 1, 2, 3], [2, 3, 0, 1], [3, 1, 2, 0], [1, 0, 2, 3], [3, 2, 1, 0], [2, 1, 3, 0], [1, 3, 2, 0]]
                        const random = Math.floor(Math.random() * order.length)
                        const theChosenOne = order[random]

                        const one = document.createElement('div')
                        one.classList.add('form-check')
                        one.innerHTML =
                            `<input class="form-check-input" type="radio" name="exampleRadios" value="${answers[theChosenOne[0]]}" id="multi0${i}"> <label class="form-check-label" for="exampleRadios1">${answers[theChosenOne[0]]}</label>`
                        preguntas.appendChild(one)

                        const two = document.createElement('div')
                        two.classList.add('form-check')
                        two.innerHTML =
                            `<input class="form-check-input" type="radio" name="exampleRadios" value="${answers[theChosenOne[1]]}" id="multi1${i}"> <label class="form-check-label" for="exampleRadios1">${answers[theChosenOne[1]]}</label>`
                        preguntas.appendChild(two)

                        const three = document.createElement('div')
                        three.classList.add('form-check')
                        three.innerHTML =
                            `<input class="form-check-input" type="radio" name="exampleRadios" value="${answers[theChosenOne[2]]}" id="multi2${i}"> <label class="form-check-label" for="exampleRadios1">${answers[theChosenOne[2]]}</label>`
                        preguntas.appendChild(three)

                        const four = document.createElement('div')
                        four.classList.add('form-check')
                        four.innerHTML =
                            `<input class="form-check-input" type="radio" name="exampleRadios" value="${answers[theChosenOne[3]]}" id="multi3${i}"> <label class="form-check-label" for="exampleRadios1">${answers[theChosenOne[3]]}</label>`
                        preguntas.appendChild(four)

                    }
                }
                const finalButton = document.createElement('div')
                finalButton.classList.add('mb-3')
                finalButton.innerHTML = '<button type="button" class="btn btn-secondary btn-lg btn-block mb-5 mt-5">VER MI RESULTADO</button>'
                questions.appendChild(finalButton)

                finalButton.addEventListener("click", () => {
                    function getScore() {
                        for (let i = 0; i < 10; i++) {
                            if (theData[i].type == 'boolean') {
                                console.log(theData[i].correct_answer)
                                for (let j = 0; j < 2; j++) {
                                    if (document.getElementById(`bool${j}${i}`).checked) {
                                        let theValue = document.getElementById(`bool${j}${i}`).value
                                        console.log(theValue)
                                        if (theValue == theData[i].correct_answer) {
                                            score = score + 100
                                            console.log(score)
                                        }
                                        else if (theValue != theData[i].correct_answer) {
                                            score = score + 0
                                            console.log(score)
                                        }
                                    }
                                }
                            } else if (theData[i].type == 'multiple') {
                                console.log(theData[i].correct_answer)
                                for (let j = 0; j < 4; j++) {
                                    if (document.getElementById(`multi${j}${i}`).checked) {
                                        let theValue = document.getElementById(`multi${j}${i}`).value
                                        console.log(theValue)
                                        if (theValue == theData[i].correct_answer) {
                                            score = score + 100
                                            console.log(score)
                                        }
                                        else if (theValue != theData[i].correct_answer) {
                                            score = score + 0
                                            console.log(score)
                                        }
                                    }
                                }
                            }else[console.log('aqui no debes llegar nunca')]
                        }
                    }

                    function getResult() {
                        const result = document.createElement('div')
                        result.classList.add('card-body')
                        result.setAttribute('id','result')
                        const text = document.createElement('h4')
                        text.classList.add('card-title' + 'text-center')
                        const p = document.createElement('h6')
                        p.classList.add('text-center')
                        if (score == 0) {
                            text.innerHTML = 'SAD :('
                            p.innerHTML = `I hope you have a pretty face. SCORE: ${score}`
                            result.appendChild(text)
                            result.appendChild(p)
                            questions.appendChild(result)
                        } else if (score > 0 && score < 500) {
                            text.innerHTML = 'Meh'
                            p.innerHTML = `I know you can do better. SCORE: ${score}`
                            result.appendChild(text)
                            result.appendChild(p)
                            questions.appendChild(result)
                        } else if (score > 500 && score < 700) {
                            text.innerHTML = 'Good'
                            p.innerHTML = `At least you know half, dont give up. SCORE: ${score}`
                            result.appendChild(text)
                            result.appendChild(p)
                            questions.appendChild(result)
                        } else if (score > 700 && score < 1000) {
                            text.innerHTML = 'Great!'
                            p.innerHTML = `You know what you are doing, Keep learning! SCORE: ${score}`
                            result.appendChild(text)
                            result.appendChild(p)
                            questions.appendChild(result)
                        } else if (score == 1000) {
                            text.innerHTML = 'Holy Guacamole!'
                            p.innerHTML = `You shoudl be working on wikipedia. Congrats!! SCORE: ${score}`
                            result.appendChild(text)
                            result.appendChild(p)
                            questions.appendChild(result)
                        } else { }
                    }

                                        function thePromise(){
                                            return new Promise((resolve,reject)=>{
                                                resolve( getScore())
                                                reject('no funciona')                       
                                            })
                                        }

                                        thePromise().then(()=>{
                                            getResult()
                                        }).catch((error) => {
                    console.log('catch '+error)
                    })
                })
                }).catch((error) => {
                    console.log(error)
                })


            })
    }

createTest()

