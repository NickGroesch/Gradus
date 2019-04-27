// To maximize tonal functionality when translating chromatics into pitch classes we adopt the convention that
// relative to a minor key we will include b2, #4, #7, #3, #6
// relative to a major key we will include b7, #1, #2, #4, #5
// which allows for maximum use of secondary dominants and mixture of major mode into minor

// Object maps pitch classes to their midi mod12 equivalent by key

// const pitchClassMidi = {
//   Gs: {
//     Bs: 0,
//     Cs: 1,
//     Css: 2,
//     Ds: 3,
//     Dss: 4,
//     Es: 5,
//     Fs: 6,
//     Fss: 7,
//     Gs: 8,
//     Gss: 9,
//     As: 10,
//     Ass: 11
//   },
//   Cs: {
//     Bs: 0,
//     Cs: 1,
//     Css: 2,
//     Ds: 3,
//     Dss: 4,
//     Es: 5,
//     Fs: 6,
//     Fss: 7,
//     Gs: 8,
//     Gss: 9,
//     As: 10,
//     B: 11
//   },
//   Fs: {
//     Bs: 0,
//     Cs: 1,
//     Css: 2,
//     Ds: 3,
//     E: 4,
//     Es: 5,
//     Fs: 6,
//     Fss: 7,
//     Gs: 8,
//     Gss: 9,
//     As: 10,
//     B: 11
//   },
//   B: {
//     Bs: 0,
//     Cs: 1,
//     Css: 2,
//     Ds: 3,
//     E: 4,
//     Es: 5,
//     Fs: 6,
//     Fss: 7,
//     Gs: 8,
//     A: 9,
//     As: 10,
//     B: 11
//   },
//   E: {
//     Bs: 0,
//     Cs: 1,
//     D: 2,
//     Ds: 3,
//     E: 4,
//     Es: 5,
//     Fs: 6,
//     Fss: 7,
//     Gs: 8,
//     A: 9,
//     As: 10,
//     B: 11
//   },
//   A: {
//     Bs: 0,
//     Cs: 1,
//     D: 2,
//     Ds: 3,
//     E: 4,
//     Es: 5,
//     Fs: 6,
//     G: 7,
//     Gs: 8,
//     A: 9,
//     As: 10,
//     B: 11
//   },
//   D: {
//     C: 0,
//     Cs: 1,
//     D: 2,
//     Ds: 3,
//     E: 4,
//     Es: 5,
//     Fs: 6,
//     G: 7,
//     Gs: 8,
//     A: 9,
//     As: 10,
//     B: 11
//   },
//   G: {
//     C: 0,
//     Cs: 1,
//     D: 2,
//     Ds: 3,
//     E: 4,
//     F: 5,
//     Fs: 6,
//     G: 7,
//     Gs: 8,
//     A: 9,
//     As: 10,
//     B: 11
//   },
//   C: {
//     C: 0,
//     Cs: 1,
//     D: 2,
//     Ds: 3,
//     E: 4,
//     F: 5,
//     Fs: 6,
//     G: 7,
//     Gs: 8,
//     A: 9,
//     Bb: 10,
//     B: 11
//   },
//   F: {
//     C: 0,
//     Cs: 1,
//     D: 2,
//     Eb: 3,
//     E: 4,
//     F: 5,
//     Fs: 6,
//     G: 7,
//     Gs: 8,
//     A: 9,
//     Bb: 10,
//     B: 11
//   },
//   Bb: {
//     C: 0,
//     Cs: 1,
//     D: 2,
//     Eb: 3,
//     E: 4,
//     F: 5,
//     Fs: 6,
//     G: 7,
//     Ab: 8,
//     A: 9,
//     Bb: 10,
//     B: 11
//   },
//   Eb: {
//     C: 0,
//     Db: 1,
//     D: 2,
//     Eb: 3,
//     E: 4,
//     F: 5,
//     Fs: 6,
//     G: 7,
//     Ab: 8,
//     A: 9,
//     Bb: 10,
//     B: 11
//   },
//   Ab: {
//     C: 0,
//     Db: 1,
//     D: 2,
//     Eb: 3,
//     E: 4,
//     F: 5,
//     Gb: 6,
//     G: 7,
//     Ab: 8,
//     A: 9,
//     Bb: 10,
//     B: 11
//   },
//   Db: {
//     C: 0,
//     Db: 1,
//     D: 2,
//     Eb: 3,
//     E: 4,
//     F: 5,
//     Gb: 6,
//     G: 7,
//     Ab: 8,
//     A: 9,
//     Bb: 10,
//     Cb: 11
//   },
//   Gb: {
//     C: 0,
//     Db: 1,
//     D: 2,
//     Eb: 3,
//     Fb: 4,
//     F: 5,
//     Gb: 6,
//     G: 7,
//     Ab: 8,
//     A: 9,
//     Bb: 10,
//     Cb: 11
//   },
//   Cb: {
//     C: 0,
//     Db: 1,
//     D: 2,
//     Eb: 3,
//     Fb: 4,
//     F: 5,
//     Gb: 6,
//     G: 7,
//     Ab: 8,
//     Bbb: 9,
//     Bb: 10,
//     Cb: 11
//   },
//   Fb: {
//     C: 0,
//     Db: 1,
//     Ebb: 2,
//     Eb: 3,
//     Fb: 4,
//     F: 5,
//     Gb: 6,
//     G: 7,
//     Ab: 8,
//     Bbb: 9,
//     Bb: 10,
//     Cb: 11
//   }
// };

// object maps scientific pitch classes to midi mod 12 (by Key is not necessary)
const pitchClassMidi = {
  C: 0,
  Cb: 11,
  Cbb: 10,
  Cs: 1,
  Css: 2,
  D: 2,
  Db: 1,
  Dbb: 0,
  Ds: 3,
  Dss: 4,
  E: 4,
  Eb: 3,
  Ebb: 2,
  Es: 5,
  Ess: 6,
  F: 5,
  Fs: 6,
  Fss: 7,
  Fb: 4,
  Fbb: 3,
  G: 7,
  Gb: 6,
  Gbb: 5,
  Gs: 8,
  Gss: 9,
  A: 9,
  Ab: 8,
  Abb: 7,
  As: 10,
  Ass: 11,
  B: 11,
  Bs: 0,
  Bss: 1,
  Bb: 10,
  Bbb: 9
};

// Object maps midi note values mod12 to their pitch class equivalents by key
const midiPitchClass = {
  Fb: ["C", "Db", "Ebb", "Eb", "Fb", "F", "Gb", "G", "Ab", "Bbb", "Bb", "Cb"],
  Cb: ["C", "Db", "D", "Eb", "Fb", "F", "Gb", "G", "Ab", "Bbb", "Bb", "Cb"],
  Gb: ["C", "Db", "D", "Eb", "Fb", "F", "Gb", "G", "Ab", "A", "Bb", "Cb"],
  Db: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "Cb"],
  Ab: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
  Eb: ["C", "Db", "D", "Eb", "E", "F", "Fs", "G", "Ab", "A", "Bb", "B"],
  Bb: ["C", "Cs", "D", "Eb", "E", "F", "Fs", "G", "Ab", "A", "Bb", "B"],
  F: ["C", "Cs", "D", "Eb", "E", "F", "Fs", "G", "Gs", "A", "Bb", "B"],
  C: ["C", "Cs", "D", "Ds", "E", "F", "Fs", "G", "Gs", "A", "Bb", "B"],
  G: ["C", "Cs", "D", "Ds", "E", "F", "Fs", "G", "Gs", "A", "As", "B"],
  D: ["C", "Cs", "D", "Ds", "E", "Es", "Fs", "G", "Gs", "A", "As", "B"],
  A: ["Bs", "Cs", "D", "Ds", "E", "Es", "Fs", "G", "Gs", "A", "As", "B"],
  E: ["Bs", "Cs", "D", "Ds", "E", "Es", "Fs", "Fss", "Gs", "A", "As", "B"],
  B: ["Bs", "Cs", "Css", "Ds", "E", "Es", "Fs", "Fss", "Gs", "A", "As", "B"],
  Fs: ["Bs", "Cs", "Css", "Ds", "E", "Es", "Fs", "Fss", "Gs", "Gss", "As", "B"],
  Cs: [
    "Bs",
    "Cs",
    "Css",
    "Ds",
    "Dss",
    "Es",
    "Fs",
    "Fss",
    "Gs",
    "Gss",
    "As",
    "B"
  ],
  Gs: [
    "Bs",
    "Cs",
    "Css",
    "Ds",
    "Dss",
    "Es",
    "Fs",
    "Fss",
    "Gs",
    "Gss",
    "As",
    "Ass"
  ]
};

// We will require translators between midi note values and scientific pitch notation, as well as scientific pitch to lilypond

// transposes a midi array (returns midi array)
const transposeMidiArray = (inputArray, semitones) => {
  let newArray = inputArray.map(note => parseInt(note) + parseInt(semitones));
  return newArray;
};
// converts pitch class to midi note value
const pitchClassToMidi = pitchClass => {
  let x = pitchClassMidi[pitchClass];
  return x;
};
// converts a scientificly notated pitch to midi
const pitchToMidi = pitch => {
  let x = pitch.split(".");
  // console.log("pctm", pitchClassToMidi(x[0], key));
  // console.log("math", 12 * (parseInt(x[1]) + 1));
  return pitchClassToMidi(x[0]) + 12 * (parseInt(x[1]) + 1);
};
// converts a pitch array to midi array
const pitchArrayToMidi = pitchArray => {
  let returnArray = [];
  pitchArray.forEach(pitch => {
    let midiVal = pitchToMidi(pitch);
    returnArray.push(midiVal);
  });
  return returnArray;
};

// converts a midi note to it's pitch class in a given key
const pitchClass = (noteIn, key) => {
  let pClass = noteIn % 12;
  return midiPitchClass[key][pClass];
};
//   converts a midi note to it's scientific pitch
const evalPitch = (noteIn, key) => {
  let pClass = pitchClass(noteIn, key);
  let octave = Math.floor(noteIn / 12) - 1;
  return pClass + "." + octave;
};
// converts midi to scientific pitch
const evalPitchArray = (midiArray, key) => {
  let returnArray = [];
  midiArray.forEach(noteIn => {
    let pitch = evalPitch(noteIn, key);
    returnArray.push(pitch);
  });
  return returnArray;
};
// we want to work with our data in dual form, both scientific pitch and midi concurrently
const formatDual = (midiArray, pitchArray) => {
  let returnArray = [];
  midiArray.forEach((value, index) => {
    let object = { midi: value, pitch: pitchArray[index] };
    returnArray.push(object);
  });
  return returnArray;
};
//
const deltaIntervalArray = midiArray => {
  let deltaArray = [];
  for (let i = 0; i + 1 < midiArray.length; i++) {
    let midiDelta = parseInt(midiArray[i + 1]) - parseInt(midiArray[i]);
    deltaArray.push(midiDelta);
  }
  return deltaArray;
};
// to measure intervals we need to assess them in base7
let test = "E.1";

const pitchBase = pitch => {
  let x = pitch.split(".");
  let letter = x[0].split("")[0];
  let octave = x[1];
  let pitchMap = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
  let base = pitchMap[letter] + 7 * octave;
  return base;
};
// we need to be able to measure an interval in both midi and scientific pitch (for simultaneous firstDual is lower pitch)
const measureInterval = (firstDual, secondDual) => {
  let pitchDiff = pitchBase(secondDual.pitch) - pitchBase(firstDual.pitch);
  let prefix = "asc";
  let intervalMap = [
    "unison",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "octave",
    "ninth",
    "tenth"
  ];
  if (pitchDiff < 0) {
    prefix = "desc";
    pitchDiff = Math.abs(pitchDiff);
  }
  // presently considering allowing the intervals up to tenth, even though octave is a compound unison, etc.
  if (pitchDiff > 9) {
    prefix += " comp";
    pitchDiff = pitchDiff % 7;
  }
  let midiDiff = deltaIntervalArray([firstDual.midi, secondDual.midi]);
  let quality = {
    unison: { 0: "perf", 1: "aug", 11: "dim" },
    second: { 0: "dim", 1: "min", 2: "maj", 3: "aug" },
    third: { 4: "maj", 3: "min", 2: "dim", 5: "aug" },
    fourth: { 5: "perf", 4: "dim", 6: "aug" },
    fifth: { 7: "perf", 8: "aug", 6: "dim" },
    sixth: { 9: "maj", 8: "min", 7: "dim", 10: "aug" },
    seventh: { 11: "maj", 10: "min", 9: "dim", 0: "aug" },
    octave: { 0: "perf", 1: "aug", 11: "dim" },
    ninth: { 0: "dim", 1: "min", 2: "maj", 3: "aug" },
    tenth: { 4: "maj", 3: "min", 2: "dim", 5: "aug" }
  };
  if (midiDiff < 0) {
    midiDiff = Math.abs(midiDiff);
  }
  if (midiDiff > 11) {
    midiDiff = midiDiff % 12;
  }
  let interval = intervalMap[pitchDiff];
  //   return prefix, quality[interval][midiDiff], interval;
  console.log(prefix, quality[interval][midiDiff], interval);
};
measureInterval({ pitch: "C.4", midi: 60 }, { pitch: "E.2", midi: 40 });
//
const deltaDual = dualArray => {
  let dualDeltaArray = [];
  for (let i = 0; i + 1 < dualArray.length; i++) {
    let value = measureInterval(dualArray[i + 1], dualArray[i]);
    dualDeltaArray.push(value);
  }
  return deltaArray;
};

const translators = {
  midiPitchClass,
  pitchClassMidi,
  transposeMidiArray,
  pitchClassToMidi,
  pitchToMidi,
  pitchClass,
  pitchArrayToMidi,
  evalPitch,
  evalPitchArray,
  formatDual,
  deltaIntervalArray,
  deltaDual,
  measureInterval
};
// WE NEED THIS ON EXCEPT FOR TESTS
// export default translators;
