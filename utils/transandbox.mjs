import translators from "./translators.mjs";
// have tested
// .pitchArrayToMidi()
// &&dependencies: pitchToMidi(), pitchClassToMidi(), pitchClassMidi{}
// .transpostMidiArray()
// .evalPitchArray()
// &&dependencies: evalPitch(), pitchClass(), midiPitchClass{}
// .formatDual()

// TODO: remove dependencies from export

let play = [
  "C.5",
  "C.5",
  "G.5",
  "G.5",
  "A.5",
  "A.5",
  "G.5",
  "G.5",
  "F.5",
  "F.5",
  "E.5",
  "E.5",
  "D.5",
  "D.5",
  "C.5"
];
let midiPlay = translators.pitchArrayToMidi(play);
midiPlay = translators.transposeMidiArray(midiPlay, -7);
console.log(midiPlay);
play = translators.evalPitchArray(midiPlay, "F");
console.log(play);
let dualPlay = translators.formatDual(midiPlay, play);
console.log(dualPlay);
