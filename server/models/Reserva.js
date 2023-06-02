const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservaSchema = new Schema(
  {
    fechaInicio: {
        type: Date, 
        required: true,
    },
    fechaFin: {
        type: Date, 
        required: true,
    },
    tiempoHoras: {
        type: Number,
        required: true,
    },
    precioTotal: {
        type: Number,
        required: true,
    },
    idActividad: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Activity',
      },
    idUsuario: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'User',
    },
  }
);

module.exports = Reserva =  mongoose.model("Reserva", ReservaSchema);