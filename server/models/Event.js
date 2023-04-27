const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    titulo: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date, 
        required: true,
    },
    contenido: {
        type: String,
    },
    documento: {
        type: String,
    },
    inscripcion: {
        type: Boolean,
        required: true,
    },
    apuntados: {
        type: [String],
    },
    idPueblo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Pueblo',
    },
  }
);

module.exports = Event =  mongoose.model("Event", EventSchema);