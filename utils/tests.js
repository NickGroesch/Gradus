const translators = require("./translators")
// General tests (key, etc)
const keyComb = (testArray, key) => {
    // use the pitch class to tune a comb of nondiatonic pitch classes. tests midi array
    let tonic = translators.pitchClassMidi[key]
    const wrap = (x, n) => (x + n) % 12
    let comb = [
        wrap(tonic, 1),
        wrap(tonic, 3),
        wrap(tonic, 6),
        wrap(tonic, 8),
        wrap(tonic, 10),
    ]
    let results = []
    testArray.forEach((midiNote, i) => {
        if (comb.includes(midiNote % 12)) {
            let index = `key check fail position ${i} `
            results.push(index)
        }
    })
    if (!results.length) { results[0] = "key check pass" }
    return results
}
// console.log(keyComb([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75], "E"))// fail [1,3,6,8,10]
// console.log(keyComb([64, 66, 68, 69, 71, 73, 75], "E"))// pass 

// // Cantus Tests
// Length- cantus create only. submit.
const lengthCF = (midiArray) => {
    let result = "length passes"
    if (!(midiArray.length < 17 && midiArray.length > 7)) {
        result = "CF Length must be between 8-16 notes"
    }
    return result
}
// console.log(lengthCF([64, 65, 66, 67, 68, 69, 70,]))//fail
// console.log(lengthCF([64, 65, 66, 67, 68, 69, 70, 71]))//pass
// console.log(lengthCF([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79]))//pass
// console.log(lengthCF([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]))//fail

const deltaRange = deltaArray => {
    let result = []
    deltaArray.forEach((delta, index) => {
        if (Math.abs(delta[3][0]) > 12) {
            result.push(`delta ${index} greater than octave`)
        }
    })
    if (!result.length) { result[0] = "all deltas within octave" }
    return result
}
let deltaRangeTestPass = [
    ["", "", "", [12]],
    ["", "", "", [0]],
    ["", "", "", [-12]]
]
let deltaRangeTestFail = [
    ["", "", "", [13]],
    ["", "", "", [0]],
    ["", "", "", [-13]]
]
// console.log(deltaRange(deltaRangeTestPass))//pass
// console.log(deltaRange(deltaRangeTestFail))//fail [0,2]

const deltaDissonantLeaps = deltaArray => {
    let result = []
    deltaArray.forEach((delta, index) => {
        if (delta[1] == "dim" || delta[1] == "aug") {
            result.push(`delta ${index} is ${delta[1]} ${delta[2]}`)
        }
        if (delta[2] == "seventh") {
            result.push(`delta ${index} is a seventh`)
        }
    })
    if (!result.length) { result[0] = "pass: no dissonant leaps/ chromatic 1/2steps" }
    return result
}
let deltaDissLeapTestPass = [
    ["", "perf", "octave", [12]],
    ["", "maj", "third", [-4]],
    ["", "min", "third", [3]]
]
let deltaDissLeapTestFail = [
    ["", "dim", "octave", [11]],
    ["", "aug", "unison", [1]],
    ["", "perf", "unison", [0]],
    ["", "minor", "seventh", [-10]]
]
console.log(deltaDissonantLeaps(deltaDissLeapTestPass))//pass
console.log(deltaDissonantLeaps(deltaDissLeapTestFail))// fail [0,1,3]