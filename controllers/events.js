const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name'); /*  en el segundo argumento
    en vez de name puedo mandar "name password" asi separado por un espacio en el mismo string
    y me trae esos dos campos */

    res.status(200).json({
        ok: true,
        msg: eventos
    })
}

const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);
    try {

        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }


}

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            })
        }

        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene el privilegio de editar este evento"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true} ); /*
        el new: true hace que me devuelva el objeto actualizado */

        res.json({
            ok: true,
            evento: eventoActualizado
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const eliminarEvento = async(req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            })
        }

        if( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene el privilegio de borrar este evento"
            })
        }

        await Evento.findByIdAndDelete( eventoId ); 

        res.json({
            ok: true
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}