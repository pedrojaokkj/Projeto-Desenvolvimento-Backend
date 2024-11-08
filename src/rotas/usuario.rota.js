const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const usuarioMid = require("../middleware/validarUsuario.middleware")
const { Usuario } = require('../db/models')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");



router.post('/', usuarioMid)
router.put('/', usuarioMid)

router.get('/', async (req, res) => {
    const usuarios = await Usuario.findAll()
    res.json({ usuarios: usuarios })
})

router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id)
    res.json({ usuarios: usuario })
})

router.post("/", async (req, res) => {
    const senha = req.body.senha;
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);
    const usuario = { email: req.body.email, senha: senhaCriptografada };
    const usuarioObj = await Usuario.create(usuario);
    res.json({ msg: "Usuário adicionado com sucesso!", userId: usuarioObj.id });
});

router.delete('/', async (req, res) => {
    const id = req.query.id

    const usuario = Usuario.findByPk(id)

    if (usuario) {
        await usuario.destroy()
        res.json({ msg: "Post deletado com sucesso!" })
    } else {
        res.status(400).json({ msg: "Post não encontrado!" })
    }
})

router.put('/', async (req, res) => {
    const id = req.query.id
    const usuario = await Usuario.findByPk(id)

    if (usuario) {
        usuario.titulo = req.body.titulo
        usuario.texto = req.body.texto
        await usuario.save()
        res.json({ msg: "Usuario atualizado com sucesso!" })
    } else {
        res.status(400).json({ msg: "Usuario não encontrado!" })
    }
})

router.post("/login", async (req, res) => {

    const email = req.body.email;
    const senha = req.body.senha;

    const usuario = await Usuario.findOne({
        where: {
            email: email,
        },
    });

    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
        const payload = {
            sub: usuario.id,
            iss: "imd-backend",
            aud: "imd-frontend",
            email: usuario.email,
        };
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '40s'})
        res.json({ accessToken: token })
    } else {
        res.status(403).json({ msg: "usuário ou senha inválidos" })
    }
});


module.exports = router