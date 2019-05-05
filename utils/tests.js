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
// console.log(comb)
// test
console.log(keyComb([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75], "E"))
// Cantus
