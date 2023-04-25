const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolSchema = new Schema(
  {
    tipoRol: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
  }
);

module.exports = Rol =  mongoose.model("Rol", RolSchema);