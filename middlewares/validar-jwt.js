const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    // X-TOKEN en los headers

    const token = req.header('x-token');
    console.log('token ' + token)
   // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzJjYWUwNWY4NDU5ZWYyZWJlZDgyMjQiLCJuYW1lIjoiZmVybmFuZG9AZ21haWwuY29tIiwiaWF0IjoxNjYzODc2MzQ3LCJleHAiOjE2NjM4ODM1NDd9.iGZ60mKg1njzPZxasLKOS7rTX98GrrLmb-j73pIbmgE'
    if (!token) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay token en la peticion'
        })
    }


    try {
        const { uid, name } = jwt.verify( //UID, NAME SALEN DEL PAYLOAD
            token,
            process.env.SECRET_JWT_SEED
        )

        console.log('Verificado ', uid, name);

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();

}

module.exports = {
    validarJWT
}