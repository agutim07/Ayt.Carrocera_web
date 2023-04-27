const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PuebloSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    fiesta: {
      type: Date, 
      required: true,
    },
    habitantes: {
      type: Number,
      required: true,
    },
    localizacion: {
      type: String,
      required: true,
    },
    redSocial: {
      type: String,
    },
    web: {
      type: String,
    },
  }
);

module.exports = Pueblo =  mongoose.model("Pueblo", PuebloSchema);