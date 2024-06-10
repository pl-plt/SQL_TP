const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema creation

const modelOfBorneSchema = new Schema(
    {
      id_borne: Number,
      puissance_max: Number, //en kW
      type_de_prise: [String], //TODO limiter le nb de type de prise possible
      vitesse_borne: { type: String, enum: ['lent', 'normale', 'rapide'] },    
    }
  )
const modelOfBorne = mongoose.model('modelOfBorne', modelOfBorneSchema);
  
const modelOfStationSchema = new Schema(
    {
      id_borne: [{  
        type: Schema.Types.ObjectId,
        ref: 'modelOfBorne',
      }],
      nb_bornes: Number,
      localisation: { lat:Number, long: Number, code_postal: Number},
      horaire: {ouverture: Date, fermeture: Date},
      autoroute: Number,
    }
  );
const modelOfStation = mongoose.model('modelOfStation', modelOfStationSchema);
  
const modelOfCarSchema = new Schema(
    {
      marque: String,
      modele: String,
      puissance_moteur: Number,
      batterie: Number,
      charge_compatible: [{
        type: Schema.Types.ObjectId,
        ref: 'modelOfBorne',
      }]
    }
  );
const modelOfCar = mongoose.model('modelOfCar', modelOfCarSchema);

  
module.exports = { modelOfBorne, modelOfStation, modelOfCar };
  
// End of schema creation
  