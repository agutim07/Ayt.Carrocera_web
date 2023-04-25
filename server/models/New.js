const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewSchema = new Schema(
  {
    titulo: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date, 
        default: Date.now,
        required: true,
    },
    contenido: {
        type: String,
    },
    documento: {
        type: String,
    },
    idUserCreador: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'User',
    },
  }
);

module.exports = New =  mongoose.model("New", NewSchema);