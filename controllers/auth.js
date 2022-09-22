const { response } = require('express');  //para que vscode me tome el tipado
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = response /*  para que me tome el tipado*/) => {
    const { name, email, password } = req.body;

    return res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
}


const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
}

const revalidarToken = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'renew'
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}