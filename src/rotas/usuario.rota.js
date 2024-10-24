const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const usuarioMid = require("../middleware/validarUsuario.middleware")
const { Usuario } = require('../db/models')


router.post('/', usuarioMid)
router.put('/', usuarioMid)

router.get('/', async(req, res) => {
    const usuarios = await Usuario.findAll()
    res.json({usuarios: usuarios})
})

router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id)
    res.json({usuarios: usuario})
})

router.post('/', async (req, res) => {
    const post = await Usuario.create(req.body)
    res.json({msg: "Usuario adicionado com sucesso!"})
})

router.delete('/', async (req, res) => {
    const id = req.query.id

    const usuario = Usuario.findByPk(id)

    if (usuario){
        await usuario.destroy()
        res.json({msg: "Post deletado com sucesso!"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
})

router.put('/', async (req, res) => {
    const id = req.query.id
    const usuario = await Usuario.findByPk(id)

    if (usuario){
        usuario.titulo = req.body.titulo
        usuario.texto = req.body.texto
        await usuario.save()
        res.json({msg: "Usuario atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: "Usuario não encontrado!"})
    }
})




module.exports = router