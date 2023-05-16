const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    autor: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date, 
    },
    disponibilidad: {
      type: Boolean,
      required: true,
      default: true,
    },
    ISBN: {
      type: Number,
      required: true,
    },
    idUserAlquiler: {
      type: Schema.Types.ObjectId,
      ref:'User',
    },
    idBiblioteca: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Library',
    },
  }
);

module.exports = Book =  mongoose.model("Book", BookSchema);