const express = require('express')
const rotaUsuario = require('./rotas/usuario.rota')
const rotaPost = require('./rotas/post.rota')
var expressLayouts = require('express-ejs-layouts')

const indexRota = require('./rotas/index.rota')

const app = express()
app.use(express.json())
app.set('view engine', 'ejs')

app.set('layout', 'layouts/layout')

app.use(expressLayouts)

app.use('/static', express.static('public'))

app.use('/api/usuario', rotaUsuario)
app.use('/api/post', rotaPost)
app.use('/', indexRota)

//get página normal
app.get('/api', (req, res) => {
    res.send('Hello World from Express')
})

//midleware error
app.use((err, req, res, next) => {
    const { statusCode, msg } = err
    res.status(statusCode).json({msg: msg})
})

//servidor
app.listen(8080, () => {
    logger.info(`Iniciando no ambiente ${process.env.NODE_ENV}`)
    logger.info('Servidor pronto na porta 8080')
})