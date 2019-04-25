// To maximize tonal functionality when translating chromatics into pitch classes we adopt the convention that
// relative to a minor key we will include b2, #4, #7, #3, #6
// relative to a major key we will include b7, #1, #2, #4, #5
// which allows for maximum use of secondary dominants and mixture of major mode into minor

// Object maps pitch classes to their midi mod12 equivalent by key
const pitchClassMidi = {
  Gs: {
    Bs: 0,
    Cs: 1,
    Css: 2,
    Ds: 3,
    Dss: 4,
    Es: 5,
    Fs: 6,
    Fss: 7,
    Gs: 8,
    Gss: 9,
    As: 10,
    Ass: 11
  },
  Cs: {
    Bs: 0,
    Cs: 1,
    Css: 2,
    Ds: 3,
    Dss: 4,
    Es: 5,
    Fs: 6,
    Fss: 7,
    Gs: 8,
    Gss: 9,
    As: 10,
    B: 11
  },
  Fs: {
    Bs: 0,
    Cs: 1,
    Css: 2,
    Ds: 3,
    E: 4,
    Es: 5,
    Fs: 6,
    Fss: 7,
    Gs: 8,
    Gss: 9,
    As: 10,
    B: 11
  },
  B: {
    Bs: 0,
    Cs: 1,
    Css: 2,
    Ds: 3,
    E: 4,
    Es: 5,
    Fs: 6,
    Fss: 7,
    Gs: 8,
    A: 9,
    As: 10,
    B: 11
  },
  E: {
    Bs: 0,
    Cs: 1,
    D: 2,
    Ds: 3,
    E: 4,
    Es: 5,
    Fs: 6,
    Fss: 7,
    Gs: 8,
    A: 9,
    As: 10,
    B: 11
  },
  A: {
    Bs: 0,
    Cs: 1,
    D: 2,
    Ds: 3,
    E: 4,
    Es: 5,
    Fs: 6,
    G: 7,
    Gs: 8,
    A: 9,
    As: 10,
    B: 11
  },
  D: {
    C: 0,
    Cs: 1,
    D: 2,
    Ds: 3,
    E: 4,
    Es: 5,
    Fs: 6,
    G: 7,
    Gs: 8,
    A: 9,
    As: 10,
    B: 11
  },
  G: {
    C: 0,
    Cs: 1,
    D: 2,
    Ds: 3,
    E: 4,
    F: 5,
    Fs: 6,
    G: 7,
    Gs: 8,
    A: 9,
    As: 10,
    B: 11
  },
  C: {
    C: 0,
    Cs: 1,
    D: 2,
    Ds: 3,
    E: 4,
    F: 5,
    Fs: 6,
    G: 7,
    Gs: 8,
    A: 9,
    Bb: 10,
    B: 11
  },
  F: {
    C: 0,
    Cs: 1,
    D: 2,
    Eb: 3,
    E: 4,
    F: 5,
    Fs: 6,
    G: 7,
    Gs: 8,
    A: 9,
    Bb: 10,
    B: 11
  },
  Bb: {
    C: 0,
    Cs: 1,
    D: 2,
    Eb: 3,
    E: 4,
    F: 5,
    Fs: 6,
    G: 7,
    Ab: 8,
    A: 9,
    Bb: 10,
    B: 11
  },
  Eb: {
    C: 0,
    Db: 1,
    D: 2,
    Eb: 3,
    E: 4,
    F: 5,
    Fs: 6,
    G: 7,
    Ab: 8,
    A: 9,
    Bb: 10,
    B: 11
  },
  Ab: {
    C: 0,
    Db: 1,
    D: 2,
    Eb: 3,
    E: 4,
    F: 5,
    Gb: 6,
    G: 7,
    Ab: 8,
    A: 9,
    Bb: 10,
    B: 11
  },
  Db: {
    C: 0,
    Db: 1,
    D: 2,
    Eb: 3,
    E: 4,
    F: 5,
    Gb: 6,
    G: 7,
    Ab: 8,
    A: 9,
    Bb: 10,
    Cb: 11
  },
  Gb: {
    C: 0,
    Db: 1,
    D: 2,
    Eb: 3,
    Fb: 4,
    F: 5,
    Gb: 6,
    G: 7,
    Ab: 8,
    A: 9,
    Bb: 10,
    Cb: 11
  },
  Cb: {
    C: 0,
    Db: 1,
    D: 2,
    Eb: 3,
    Fb: 4,
    F: 5,
    Gb: 6,
    G: 7,
    Ab: 8,
    Bbb: 9,
    Bb: 10,
    Cb: 11
  },
  Fb: {
    C: 0,
    Db: 1,
    Ebb: 2,
    Eb: 3,
    Fb: 4,
    F: 5,
    Gb: 6,
    G: 7,
    Ab: 8,
    Bbb: 9,
    Bb: 10,
    Cb: 11
  }
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
// converts pitch class to midi given a key
const pitchClassToMidi = (pitchClass, key) => {
  let x = pitchClassMidi[key][pitchClass];
  return x;
};
// converts a scientificly notated pitch to midi given key
const pitchToMidi = (pitch, key) => {
  x = pitch.split(".");
  // console.log("pctm", pitchClassToMidi(x[0], key));
  // console.log("math", 12 * (parseInt(x[1]) + 1));
  return pitchClassToMidi(x[0], key) + 12 * (parseInt(x[1]) + 1);
};
// converts a midi note to it's pitch class in a given key
const pitchClass = (noteIn, key) => {
  let pClass = noteIn % 12;
  return midiPitchClass[key][pClass];
};
//   converts a midi note to it's scientific pitch
const evalPitch = (noteIn, key) => {
  pClass = pitchClass(noteIn, key);
  octave = Math.floor(noteIn / 12) - 1;
  return pClass + "." + octave;
};
