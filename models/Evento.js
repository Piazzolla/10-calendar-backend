const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

EventoSchema.method('toJSON', function() {  /* cambio como se ve la info cuando me la devuelve
 para que no aparezca el campo __v que no me interesa y para que _id se vea como id  */ 
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema );