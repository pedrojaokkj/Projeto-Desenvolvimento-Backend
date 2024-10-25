const express = require('express')
const rotaUsuario = require('./rotas/usuario.rota')
const rotaPost = require('./rotas/post.rota')
var expressLayouts = require('express-ejs-layouts')

const app = express()
app.use(express.json())
app.set('view engine', 'ejs')

app.set('layout', 'layouts/layout')

app.use(expressLayouts)

app.use('/static', express.static('public'))

app.use('/usuario', rotaUsuario)
app.use('/post', rotaPost)

//get página normal
app.get('/', (req, res) => {
    res.send('Hello World from Express')
})

//get página
app.get('/home', (req, res) => {
    const number = Math.random()
    res.render('pages/index', {variavel : number})
})

//get página cursos
app.get('/cursos', (req, res) => {
    const cursos = [
            {nome: "Programação fronend", ch: 280}, 
            {nome: "Programação backend", ch: 330},
            {nome: "Programação concorrente", ch: 300},
            {nome: "Programação distribuída", ch: 400}
    ]
    res.render('pages/cursos/index', {cursos: cursos})
})


app.get('/alunos', (req, res) => {
    const alunos = [
            {nome: "João Pedro"},
            {nome: "Fernanda"},
            {nome: "Francisco"}
    ]
    res.render('pages/alunos/index', {alunos: alunos})
})


//servidor
app.listen(8080, () => {
    console.log(`Iniciando no ambiente ${process.env.NODE_ENV}`)
    console.log('Servidor pronto na porta 8080"')
})