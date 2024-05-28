const express = require('express');
const serveIndex = require('serve-index');
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);


const app = express();
const Schema = mongoose.Schema;


const modelOfBorneSchema = new Schema(
  {
    id_borne: Number,
    puissance_max: Number, //en kW
    type_de_prise: [String], //TODO limiter le nb de type de prise possible
    vitesse_borne: String, //TODO resteindre la vitesse a lent, normale, rapide
  }
)
const modelOfBorne = mongoose.model('modelOfBorne', modelOfBorneSchema);

const modelOfStationSchema = new Schema(
  {
    id_borne: [{  
      type: Schema.Types.ObjectId,
      ref: modelOfBorne.id_borne,
    }],
    nb_bornes: Number,
    localisation: { lat:Number, long: Number, code_postal: Number},
    horaire: {ouverture: Date, fermeture: Date},
    autoroute: Number,
  }
)
const modelOfStation = mongoose.model('modelOfStation', modelOfStationSchema);

const modelOfCarSchema = new Schema(
  {
    marque: String,
    modele: String,
    puissance_moteur: Number,
    batterie: Number,
    charge_compatible: [{
      type: Schema.Types.ObjectId,
      ref: modelOfBorne,
    }]
  }
)
const modelOfCar = mongoose.model('modelOfCar', modelOfCarSchema);

app.use(express.static('public'));
app.use('/public', serveIndex('public', {'icons': true}));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/'+next)
  }
}

app.listen(3000, () => console.log('Server is running at http://localhost:3000'));