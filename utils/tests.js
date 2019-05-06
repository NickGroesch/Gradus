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
    let results = [false, []]
    testArray.forEach((midiNote, i) => {
        if (comb.includes(midiNote % 12)) {
            let index = `key check fail position ${i} `
            results[1].push(index)
        }
    })
    if (!results[1].length) {
        results[0] = true
        results[1] = "key check pass"
    }
    return results
}
// console.log(keyComb([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75], "E"))// fail [1,3,6,8,10]
// console.log(keyComb([64, 66, 68, 69, 71, 73, 75], "E"))// pass 

// // Cantus Tests
// Length- cantus create only. submit.
const lengthCF = (dualArray) => {
    let result = [true, "length passes"]
    if (!(dualArray.length < 17 && dualArray.length > 7)) {
        result = [false, "CF Length must be between 8-16 notes"]
    }
    return result
}
// console.log(lengthCF([64, 65, 66, 67, 68, 69, 70,]))//fail
// console.log(lengthCF([64, 65, 66, 67, 68, 69, 70, 71]))//pass
// console.log(lengthCF([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79]))//pass
// console.log(lengthCF([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]))//fail

const deltaRange = deltaArray => {
    let result = [true, []]
    deltaArray.forEach((delta, index) => {
        if (Math.abs(delta[3][0]) > 12) {
            result[1].push(`delta ${index} greater than octave`)
        }
    })
    if (!result[1].length) { result[1] = "all deltas within octave" } else { result[0] = false }
    return result
}
// let deltaRangeTestPass = [
//     ["", "", "", [12]],
//     ["", "", "", [0]],
//     ["", "", "", [-12]]
// ]
// let deltaRangeTestFail = [
//     ["", "", "", [13]],
//     ["", "", "", [0]],
//     ["", "", "", [-13]]
// ]
// console.log(deltaRange(deltaRangeTestPass))//pass
// console.log(deltaRange(deltaRangeTestFail))//fail [0,2]

const deltaDissonantLeaps = deltaArray => {
    let result = [false, []]
    deltaArray.forEach((delta, index) => {
        if (delta[1] == "dim" || delta[1] == "aug") {
            result[1].push(`delta ${index} is ${delta[1]} ${delta[2]}`)
        }
        if (delta[2] == "seventh") {
            result[1].push(`delta ${index} is a seventh`)
        }
    })
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no dissonant leaps/ chromatic 1/2steps"
    }
    return result
}
// let deltaDissLeapTestPass = [
//     ["", "perf", "octave", [12]],
//     ["", "maj", "third", [-4]],
//     ["", "min", "third", [3]]
// ]
// let deltaDissLeapTestFail = [
//     ["", "dim", "octave", [11]],
//     ["", "aug", "unison", [1]],
//     ["", "perf", "unison", [0]],
//     ["", "minor", "seventh", [-10]]
// ]
// console.log(deltaDissonantLeaps(deltaDissLeapTestPass))//pass
// console.log(deltaDissonantLeaps(deltaDissLeapTestFail))// fail [0,1,3]
const rangeCF = (dualArray) => {
    let result = [true, []]
    let low = [127, 0]
    let high = [0, 0]
    dualArray.forEach((value, index) => {
        console.log(value.midi)
        if (value.midi < low[0]) { low = [value.midi, index] }
        if (value.midi > high[0]) { high = [value.midi, index] }
    })
    let range = high[0] - low[0]
    if (range > 16) {
        result[0] = false
        result[1] = `range exceeds a tenth`
    } else { result[1] = `range acceptable (low ${low[0]} at pos. ${low[1]} to high ${high[0]} at pos. ${high[1]}) ` }
    return result
}
// let rangeCFtestPass = [
//     { midi: 60 },
//     { midi: 58 },
//     { midi: 68 },
//     { midi: 74 },
//     { midi: 72 },

// ]
// let rangeCFtestFail = [
//     { midi: 60 },
//     { midi: 58 },
//     { midi: 68 },
//     { midi: 75 }
// ]
// console.log(rangeCF(rangeCFtestPass))//pass (high:3, low:(1))
// console.log(rangeCF(rangeCFtestFail))// fail

const noRepetition = (dualArray) => {
    let result = [false, []]
    for (let i = 0; i < dualArray.length - 1; i++) {
        if (dualArray[i].midi == dualArray[i + 1].midi) {
            result[1].push(`note at pos. ${i} is immediately repeated`)
        }
    }
    if (!result[1].length) {
        result[0] = true
        result[1] = "no repetition detected"
    }
    return result
}
// let repCFtestPass = [
//     { midi: 60 },
//     { midi: 58 },
//     { midi: 68 },
//     { midi: 74 },
//     { midi: 72 },

// ]
// let repCFtestFail = [
//     { midi: 60 },
//     { midi: 58 },
//     { midi: 68 },
//     { midi: 68 },
//     { midi: 75 }
// ]
// console.log(noRepetition(repCFtestPass))//pass 
// console.log(noRepetition(repCFtestFail))// fail(pos2)

const verticalDissonanceBass = (intervalArray) => {
    let result = [false, []]
    intervalArray.forEach((interval, index) => {
        if (interval[1] == "dim" || interval[1] == "aug") {
            result[1].push(`interval ${index} is ${interval[1]} ${interval[2]}`)
        }
        if (interval[2] == "seventh" || interval[2] == "second" || interval[2] == "ninth" || interval[2] == "fourth") {
            result[1].push(`interval ${index} is a seventh`)
        }

        if (!result[1].length) {
            result[0] = true
            result[1] = "pass: no vertical dissonances"
        }
    })
    return result
}
// let dissonantIntervalPass = [
//     ["", "perf", "octave", [12]],
//     ["", "maj", "third", [-4]],
//     ["", "min", "third", [3]],
//     // ["", "perf", "fourth", [5]]
// ]
// let dissonantIntervalFail = [
//     ["", "dim", "octave", [11]],
//     ["", "aug", "unison", [1]],
//     ["", "perf", "unison", [0]],
//     ["", "minor", "seventh", [-10]],
//     ["", "perf", "fourth", [5]],
//     ["", "minor", "sixth", [8]],
//     ["", "major", "second", [2]],
//     ["", "major", "ninth", [14]]
// ]
// console.log(verticalDissonanceBass(dissonantIntervalPass))//pass
// console.log(verticalDissonanceBass(dissonantIntervalFail))// fail [0,1,3,4,6,7]

const verticalDissonanceUpper = (intervalArray) => {
    let result = [false, []]
    intervalArray.forEach((interval, index) => {
        if (interval[1] == "dim" || interval[1] == "aug") {
            result[1].push(`interval ${index} is ${interval[1]} ${interval[2]}`)
        }
        if (interval[2] == "seventh" || interval[2] == "second" || interval[2] == "ninth") {
            result[1].push(`interval ${index} is a seventh`)
        }

        if (!result[1].length) {
            result[0] = true
            result[1] = "pass: no vertical dissonances"
        }
    })
    return result
}
// let dissonantIntervalUpperPass = [
//     ["", "perf", "octave", [12]],
//     ["", "maj", "third", [-4]],
//     ["", "min", "third", [3]],
//     ["", "perf", "fourth", [5]]
// ]
// let dissonantIntervalUpperFail = [
//     ["", "dim", "octave", [11]],
//     ["", "aug", "unison", [1]],
//     ["", "perf", "unison", [0]],
//     ["", "minor", "seventh", [-10]],
//     ["", "aug", "fourth", [6]],
//     ["", "perf", "fourth", [5]],
//     ["", "minor", "sixth", [8]],
//     ["", "major", "second", [2]],
//     ["", "major", "ninth", [14]]
// ]
// console.log(verticalDissonanceUpper(dissonantIntervalUpperPass))//pass
// console.log(verticalDissonanceUpper(dissonantIntervalUpperFail))// fail [0,1,3,4,7,8]

const detectUnisons = (intervalArray) => {
    let result = [false, []]
    for (var i = 1; i < intervalArray.length - 1; i++) {
        if (intervalArray[i][2] == "unison") {
            result[1].push(`interval ${i} is a prohibited unison`)
        }
    }
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no prohibited unisons"
    }
    return result
}
// let detectUnisonsFail = [
//     ["", "perf", "unison", [0]],
//     ["", "aug", "unison", [1]],
//     ["", "perf", "unison", [0]],
//     ["", "minor", "seventh", [-10]],
//     ["", "aug", "fourth", [6]],
//     ["", "perf", "fourth", [5]],
//     ["", "perf", "unison", [0]],
//     ["", "major", "second", [2]],
//     ["", "perf", "unison", [0]]
// ]
// let detectUnisonsPass = [
//     ["", "perf", "unison", [0]],
//     ["", "minor", "seventh", [-10]],
//     ["", "aug", "fourth", [6]],
//     ["", "perf", "fourth", [5]],
//     ["", "major", "second", [2]],
//     ["", "perf", "unison", [0]]
// ]
// console.log(detectUnisons(detectUnisonsPass))//pass
// console.log(detectUnisons(detectUnisonsFail))//fail [1,2,6]

const detectVoiceCrossing = (dualArray1, dualArray2) => {
    let result = [false, []]
    dualArray1.forEach((value, index) => {
        if (value.midi > dualArray2[index].midi) {
            result[1].push(`voice crossed at pos. ${index}`)
        }
    })
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no voice crossing"
    }
    return result
}
// let voiceCrossingFail1 = [
//     { midi: 60 },
//     { midi: 58 },
//     { midi: 68 },
//     { midi: 68 },
//     { midi: 75 }
// ]
// let voiceCrossingFail2 = [
//     { midi: 61 },
//     { midi: 58 },
//     { midi: 67 },
//     { midi: 68 },
//     { midi: 74 }
// ]
// let voiceCrossingPass1 = [
//     { midi: 60 },
//     { midi: 58 },
//     { midi: 68 },
//     { midi: 68 },
//     { midi: 75 }
// ]
// let voiceCrossingPass2 = [
//     { midi: 61 },
//     { midi: 59 },
//     { midi: 69 },
//     { midi: 69 },
//     { midi: 76 }
// ]
// console.log(detectVoiceCrossing(voiceCrossingFail1, voiceCrossingFail2))//fail [2,4]
// console.log(detectVoiceCrossing(voiceCrossingPass1, voiceCrossingPass2))//pass
// console.log(detectVoiceCrossing(voiceCrossingPass2, voiceCrossingPass1))//fail everywhere