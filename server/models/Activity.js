const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    precio_hr: {
      type: Number,
      required: true,
    },
    exclusivo: {
      type: Boolean,
      required: true,
      default: false,
    },
    habilitada: {
      type: Boolean,
      default: true,
      required: true,
    },
    apertura: {
      type: String,
    },
    cierre: {
      type: String,
    },
    idPueblo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Pueblo',
    },
  }
);

module.exports = Activity =  mongoose.model("Activity", ActivitySchema);