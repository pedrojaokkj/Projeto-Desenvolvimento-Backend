const express = require('express')
const rotaUsuario = require('./rotas/usuario.rota')
const rotaPost = require('./rotas/post.rota')

const app = express()
app.use(express.json())

app.use('/static', express.static('public'))

app.use('/usuario', rotaUsuario)
app.use('/post', rotaPost)

//get página normal
app.get('/', (req, res) => {
    res.send('Hello World from Express')
})



//servidor
app.listen(8080, () => {
    console.log('Servidor pronto na porta 8080"')
})