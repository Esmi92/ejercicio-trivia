const answers = ['pez','pato','gato','raton']
const order =[[0,1,2,3],[2,3,0,1],[3,1,2,0],[1,0,2,3],[3,2,1,0],[2,1,3,0],[1,3,2,0]]
let random = Math.floor(Math.random() * order.length)
let theChosenOne = order[random]
console.log(answers[theChosenOne[0]])
console.log(answers[theChosenOne[1]])
console.log(answers[theChosenOne[2]])
console.log(answers[theChosenOne[3]])

const mueble =[
    {
        name:'juan',
        cosas:['agua','sal','ropa']
    },
    {
        name:'mary',
        cosas:['musica','vida','salud']
    }
]
console.log(mueble[1].cosas[2])