//Seeds for MongoDB (schema already in models)
//connect to DB here and pass an object (seed) to DB (dummy data)

//can also use Heroku terminal to npm run seed or whatever, you can do whatever you want
// cantus firmus seeds.
CantusFirmus.create({ name: "1-21a", composer: "Schenker", key: "C", midiArray: [60, 62, 65, 64, 65, 67, 69, 67, 64, 62, 60] })
CantusFirmus.create({ name: "1-21b", key: "C", midiArray: [60, 62, 64, 65, 67, 62, 65, 64, 62, 60] })
CantusFirmus.create({ name: "1-21c", key: "Eb", midiArray: [60, 62, 65, 63, 68, 67, 65, 62, 63, 62, 60] })
CantusFirmus.create({ name: "1-21d", key: "D", midiArray: [62, 67, 66, 71, 69, 66, 67, 66, 64, 62] })
CantusFirmus.create({ name: "1-21e", composer: "Fux", key: "F", midiArray: [62, 65, 64, 62, 67, 65, 69, 67, 65, 64, 62] })