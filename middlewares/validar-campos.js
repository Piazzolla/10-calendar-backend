const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    // Manejo de errores
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    console.log(errors);
    next();
}

module.exports = {
    validarCampos
}