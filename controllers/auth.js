const { response } = require('express');  //para que vscode me tome el tipado
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')


const crearUsuario = async (req, res = response /*  para que me tome el tipado*/) => {

    const { name, email, password } = req.body;
    try {

        let usuario = await Usuario.findOne({ email }) //igual a pasar email: email
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }
        usuario = new Usuario(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //generar JWT
        const token = await generarJWT( usuario.id, usuario.name )

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        })
    }
}


const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email }) //igual a pasar email: email
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }


        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password);
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el administrador'
        })

    }


}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;

    // generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, name );


    res.json({
        ok: true,
        uid,
        token
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}