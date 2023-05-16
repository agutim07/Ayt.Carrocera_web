const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    idUserEncargado: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'User',
    },
    idPueblo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Pueblo',
    },
  }
);

module.exports = Library =  mongoose.model("Library", LibrarySchema);