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
    return results
}
// tests
// console.log(keyComb([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75], "E"))// should fail [1,3,6,8,10]

// // Cantus Tests
// Length- cantus create only. submit.
const lengthCF = (midiArray) => {
    let result = "length passes"
    if (!(midiArray.length < 17 && midiArray.length > 7)) {
        result = "CF Length must be between 8-16 notes"
    }
    return result
}
console.log(lengthCF([64, 65, 66, 67, 68, 69, 70,]))//fail
console.log(lengthCF([64, 65, 66, 67, 68, 69, 70, 71]))//pass
console.log(lengthCF([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79]))//pass
console.log(lengthCF([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]))//fail

