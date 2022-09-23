/*
    Events routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require('../helpers/isDate');

const router = Router();

// Todas tienen que pasar por la validacion del JWT
router.use( validarJWT );

//crear controlador getEventos

router.get('/',  getEventos );

router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
    validarCampos
] ,crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;
