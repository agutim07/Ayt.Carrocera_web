const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    dni: {
        type: String,
        required: true,
    },
    fechaNac: {
        type: Date, 
        required: true,
    },
    username: {
      type: String,
      required: true,
      },
    pass: {
      type: String,
      required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    idRol: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'Rol',
    },
  }
);

module.exports = User =  mongoose.model("User", UserSchema);