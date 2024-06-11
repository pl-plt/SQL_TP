const mongoose = require('mongoose');
const { modelOfBorne, modelOfStation, modelOfCar } = require('./models');

require('./server'); 

mongoose.connection.once('open', async function() {
    console.log('Connected to the database');
  
    try {
      // Sample data for Borne
      const borne1 = new modelOfBorne({ id_borne: 1, puissance_max: 50, type_de_prise: ['Type1', 'Type2'], vitesse_borne: 'rapide' });
      const borne2 = new modelOfBorne({ id_borne: 2, puissance_max: 22, type_de_prise: ['Type1'], vitesse_borne: 'normale' });
      const borne3 = new modelOfBorne({ id_borne: 3, puissance_max: 75, type_de_prise: ['Type2', 'Type3'], vitesse_borne: 'rapide' });
      const borne4 = new modelOfBorne({ id_borne: 4, puissance_max: 11, type_de_prise: ['Type1'], vitesse_borne: 'lent' });
  
      await borne1.save();
      await borne2.save();
      await borne3.save();
      await borne4.save();
  
      // Sample data for Station
      const station1 = new modelOfStation({ id_station:0, id_borne: [borne1.id_borne, borne2.id_borne], nb_bornes: 2, localisation: { lat: 48.8566, long: 2.3522, code_postal: 75 }, horaire: { ouverture: new Date('2024-06-10T08:00:00Z'), fermeture: new Date('2024-06-10T20:00:00Z') }, autoroute: 1 });
      const station2 = new modelOfStation({ id_station:1, id_borne: [borne3.id_borne, borne4.id_borne], nb_bornes: 2, localisation: { lat: 40.7128, long: -74.0060, code_postal: 10 }, horaire: { ouverture: new Date('2024-06-10T08:00:00Z'), fermeture: new Date('2024-06-10T22:00:00Z') }, autoroute: 0 });
      const station3 = new modelOfStation({ id_station:2, id_borne: [borne1.id_borne, borne3.id_borne], nb_bornes: 2, localisation: { lat: 34.0522, long: -118.2437, code_postal: 90 }, horaire: { ouverture: new Date('2024-06-10T06:00:00Z'), fermeture: new Date('2024-06-10T20:00:00Z') }, autoroute: 1 });
      const station4 = new modelOfStation({ id_station:3, id_borne: [borne2.id_borne, borne4.id_borne], nb_bornes: 2, localisation: { lat: 51.5074, long: -0.1278, code_postal: 10 }, horaire: { ouverture: new Date('2024-06-10T08:00:00Z'), fermeture: new Date('2024-06-10T20:00:00Z') }, autoroute: 0 });
  
      await station1.save();
      await station2.save();
      await station3.save();
      await station4.save();
  
      // Sample data for Car
      const car1 = new modelOfCar({ marque: 'Tesla', modele: 'Model 3', puissance_moteur: 283, batterie: 75, charge_compatible: [borne1.id_borne, borne2.id_borne] });
      const car2 = new modelOfCar({ marque: 'Nissan', modele: 'Leaf', puissance_moteur: 110, batterie: 40, charge_compatible: [borne2.id_borne, borne3.id_borne] });
      const car3 = new modelOfCar({ marque: 'Chevrolet', modele: 'Bolt EV', puissance_moteur: 200, batterie: 66, charge_compatible: [borne1.id_borne, borne4.id_borne] });
      const car4 = new modelOfCar({ marque: 'BMW', modele: 'i3', puissance_moteur: 170, batterie: 42, charge_compatible: [borne3.id_borne, borne4.id_borne] });
  
      await car1.save();
      await car2.save();
      await car3.save();
      await car4.save();
  
      console.log('Sample data inserted');
    } catch (error) {
      console.error('Error inserting sample data:', error);
    } finally {
      mongoose.connection.close();
    }
});