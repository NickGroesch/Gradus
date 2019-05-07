const translators = require("./translators")
// results will be an array composed of a boolean pass/fail, an array of relevant log messages, and
// where applicable an array of positions that would be highlighted in the interactive data display 


// General test for key: will need to be adapted to allow for leading tone in minor for extensibility
const keyComb = (dualArray, key) => {
    // use the pitch class to tune a comb of nondiatonic pitch classes. tests midi array
    let tonic = translators.pitchClassMidi[key]
    const wrap = (x, n) => (x + n) % 12
    let comb = [
        wrap(tonic, 1),
        wrap(tonic, 3),
        wrap(tonic, 6),//minor-2
        wrap(tonic, 8),//minor-1
        wrap(tonic, 10),
    ]
    let results = [false, [], []]
    dualArray.forEach((value, i) => {
        if (comb.includes(value.midi % 12)) {
            let index = `key comb fail position ${i} `
            results[1].push(index)
            results[2].push(i)
        }
    })
    if (!results[1].length) {
        results[0] = true
        results[1] = "pass key comb"
    }
    return results
}
// console.log(keyComb([64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75], "E"))// fail [1,3,6,8,10]
// console.log(keyComb([64, 66, 68, 69, 71, 73, 75], "E"))// pass 

// // Cantus Tests
// Length- cantus create only. submit.
const lengthCF = (dualArray) => {
    let result = [true, "pass: length"]
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
    let result = [true, [], []]
    deltaArray.forEach((delta, index) => {
        if (Math.abs(delta[3][0]) > 12) {
            result[1].push(`delta ${index} greater than octave`)
            result[2].push(index)
        }
    })
    if (!result[1].length) { result[1] = "pass: all deltas within octave" } else { result[0] = false }
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
    let result = [false, [], []]
    deltaArray.forEach((delta, index) => {
        if (delta[1] == "dim" || delta[1] == "aug") {
            result[1].push(`delta ${index} is ${delta[1]} ${delta[2]}`)
            result[2].push(index)
        }
        if (delta[2] == "seventh") {
            result[1].push(`delta ${index} is a seventh`)
            result[2].push(index)

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

// dissonant outlines require the extraction of zeros (points of inflection/change in direction) and application of dissonantLeaps to zeroArray
const dissonantOutlines = (dualArray, deltaArray) => {
    let result = [false, [], []]
    let zeroIndex = [0]
    let zeroArray = [dualArray[0]]
    for (var i = 0; i < deltaArray.length - 1; i++) {
        if (deltaArray[i][3] > 0 && deltaArray[i + 1][3] < 0 || deltaArray[i][3] < 0 && deltaArray[i + 1][3] > 0) {
            zeroArray.push(dualArray[i + 1])
            zeroIndex.push(i + 1)
        }
    }
    zeroArray.push(dualArray[dualArray.length - 1])
    zeroIndex.push(dualArray.length - 1)
    let intermediate = deltaDissonantLeaps(translators.deltaDual(zeroArray))
    if (intermediate[2].length) {
        intermediate[2].forEach((value, index) => {
            result[1].push(`dissonant outline from pos. ${zeroIndex[value]} to ${zeroIndex[value + 1]}: ${intermediate[1][index]} `)
            result[2].push(zeroIndex[value + 1])
        })
    }
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no dissonant outlines"
    }
    // console.log("inner index", zeroIndex)

    return result
}

// dissOutlinesFailDual = [{ midi: 60, pitch: "C.4" },
// { midi: 67, pitch: "G.4" },
// { midi: 69, pitch: "A.4" },
// { midi: 67, pitch: "G.4" },
// { midi: 60, pitch: "C.4" },
// { midi: 59, pitch: "B.3" },
// { midi: 60, pitch: "C.4" }]
// dissOutlinesFailDelta = [["asc", "perf", "fifth", [7]],
// ["asc", "maj", "second", [2]],
// ["desc", "maj", "second", [-2]],
// ["desc", "perf", "fifth", [-7]],
// ["desc", "min", "second", [-1]],
// ["asc", "min", "second", [1]]]
// dissOutlinesFailDual2 = [{ midi: 60, pitch: "C.4" },
// { midi: 67, pitch: "G.4" },
// { midi: 69, pitch: "A.4" },
// { midi: 67, pitch: "G.4" },
// { midi: 60, pitch: "C.4" },
// { midi: 59, pitch: "B.3" },
// { midi: 65, pitch: "F.4" },
// { midi: 60, pitch: "C.4" }]
// dissOutlinesFailDelta2 = [["asc", "perf", "fifth", [7]],
// ["asc", "maj", "second", [2]],
// ["desc", "maj", "second", [-2]],
// ["desc", "perf", "fifth", [-7]],
// ["desc", "min", "second", [-1]],
// ["asc", "dim", "fifth", [6]],
// ["asc", "perf", "fourth", [-5]]]
// dissOutlinesPassDual3 = [{ midi: 60, pitch: "C.4" },
// { midi: 67, pitch: "G.4" },
// { midi: 69, pitch: "A.4" },
// { midi: 67, pitch: "G.4" },
// { midi: 60, pitch: "C.4" }]
// dissOutlinesPassDelta3 = [["asc", "perf", "fifth", [7]],
// ["asc", "maj", "second", [2]],
// ["desc", "maj", "second", [-2]],
// ["desc", "perf", "fifth", [-7]]]

// console.log("outer", dissonantOutlines(dissOutlinesFailDual, dissOutlinesFailDelta))//fail [5]
// console.log("outer2", dissonantOutlines(dissOutlinesFailDual2, dissOutlinesFailDelta2))//fail [5,6]
// console.log("outer3", dissonantOutlines(dissOutlinesPassDual3, dissOutlinesPassDelta3))//pass


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
    } else { result[1] = `pass: range acceptable (low ${low[0]} at pos. ${low[1]} to high ${high[0]} at pos. ${high[1]}) ` }
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
    let result = [false, [], []]
    for (let i = 0; i < dualArray.length - 1; i++) {
        if (dualArray[i].midi == dualArray[i + 1].midi) {
            result[1].push(`note at pos. ${i} is immediately repeated`)
            result[2].push(i + 1)
        }
    }
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no repetition detected"
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
    let result = [false, [], []]
    intervalArray.forEach((interval, index) => {
        if (interval[1] == "dim" || interval[1] == "aug") {
            result[1].push(`interval ${index} is ${interval[1]} ${interval[2]}`)
            result[2].push(index)
        }
        if (interval[2] == "seventh" || interval[2] == "second" || interval[2] == "ninth" || interval[2] == "fourth") {
            result[1].push(`interval ${index} is a ${interval[2]}`)
            result[2].push(index)
        }

    })
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no vertical dissonances with bass"
    }
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
    let result = [false, [], []]
    intervalArray.forEach((interval, index) => {
        if (interval[1] == "dim" || interval[1] == "aug") {
            result[1].push(`interval ${index} is ${interval[1]} ${interval[2]}`)
            result[2].push(index)
        }
        if (interval[2] == "seventh" || interval[2] == "second" || interval[2] == "ninth") {
            result[1].push(`interval ${index} is a seventh`)
            result[2].push(index)
        }
    })
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no vertical dissonances between upper voices"
    }
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
    let result = [false, [], []]
    for (var i = 1; i < intervalArray.length - 1; i++) {
        if (intervalArray[i][2] == "unison") {
            result[1].push(`interval ${i} is a prohibited unison`)
            result[2].push(i)
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
    let result = [false, [], []]
    dualArray1.forEach((value, index) => {
        if (value.midi > dualArray2[index].midi) {
            result[1].push(`voices crossed at pos. ${index}`)
            result[2].push(index)
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

// vertical spacing only runs on adjacent voices,
const verticalSpacingRed = (intervalArray) => {
    let result = [false, [], []]
    for (var i = 0; i < intervalArray.length; i++) {
        if (intervalArray[i][3][0] > 21) {
            result[1].push(`interval ${i} is way too big`)
            result[2].push(i)
        }
    }
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no severe range issues"
    }
    return result
}
// let verticalSpacingRedFail = [
//     ["", "perf", "unison", [0]],
//     ["", "aug", "unison", [21]],
//     ["", "perf", "unison", [22]],
//     ["", "minor", "seventh", [10]],
//     ["", "aug", "fourth", [6]],
//     ["", "perf", "fourth", [23]],
//     ["", "perf", "unison", [0]],
//     ["", "major", "second", [2]],
//     ["", "perf", "unison", [0]]
// ]
// let verticalSpacingRedPass = [
//     ["", "perf", "unison", [0]],
//     ["", "minor", "seventh", [21]],
//     ["", "aug", "fourth", [20]],
//     ["", "perf", "fourth", [5]],
//     ["", "major", "second", [2]],
//     ["", "perf", "unison", [0]]
// ]
// console.log(verticalSpacingRed(verticalSpacingRedPass))//pass
// console.log(verticalSpacingRed(verticalSpacingRedFail))//fail [2,5]
const verticalSpacingYellow = (intervalArray) => {
    let result = [false, [], []]
    for (var i = 0; i < intervalArray.length; i++) {
        if (intervalArray[i][3][0] > 16) {
            result[1].push(`interval ${i} is a bit big`)
            result[2].push(i)
        }
    }
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no range issues"
    }
    return result
}
// let verticalSpacingYellowFail = [
//     ["", "perf", "unison", [0]],
//     ["", "aug", "unison", [17]],
//     ["", "perf", "unison", [16]],
//     ["", "minor", "seventh", [10]],
//     ["", "aug", "fourth", [6]],
//     ["", "perf", "fourth", [18]],
//     ["", "perf", "unison", [0]],
//     ["", "major", "second", [2]],
//     ["", "perf", "unison", [0]]
// ]
// let verticalSpacingYellowPass = [
//     ["", "perf", "unison", [0]],
//     ["", "minor", "seventh", [16]],
//     ["", "aug", "fourth", [16]],
//     ["", "perf", "fourth", [5]],
//     ["", "major", "second", [2]],
//     ["", "perf", "unison", [0]]
// ]
// console.log(verticalSpacingYellow(verticalSpacingYellowPass))//pass
// console.log(verticalSpacingYellow(verticalSpacingYellowFail))//fail [1,5]

const parallel5or8 = (intervalArray, motionArray) => {
    let result = [false, [], []]
    motionArray.forEach((value, index) => {
        if (value == "parallel" && intervalArray[index + 1][2] == "fifth") {
            result[1].push(`PARALLEL FIFTHS from pos. ${index} `)
            result[2].push(index)
        }
        if (value == "parallel" && intervalArray[index + 1][2] == "octave") {
            result[1].push(`PARALLEL OCTAVES from pos. ${index} `)
            result[2].push(index)
        }
    })
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no parallel fifths or octaves"
    }
    return result
}
const direct5or8 = (intervalArray, motionArray) => {
    let result = [false, []]
    motionArray.forEach((value, index) => {
        if (value == "similar" && intervalArray[index + 1][2] == "fifth") {
            result[1].push(`direct octave at pos. ${index + 1} `)
        }
        if (value == "similar" && intervalArray[index + 1][2] == "octave") {
            result[1].push(`direct octave at pos. ${index + 1} `)
        }
    })
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: no parallel fifths or octaves"
    }
    return result
}

// let parallel5or8PassInt = [
//     ["", "perf", "unison", [0]],
//     ["", "minor", "seventh", [16]],
//     ["", "aug", "sixth", [16]],
//     ["", "perf", "sixth", [5]],
//     ["", "major", "third", [2]],
//     ["", "perf", "third", [0]]
// ]
// let parallel5or8FailInt = [
//     ["", "perf", "octave", [12]],
//     ["", "perf", "octave", [12]],
//     ["", "perf", "fifth", [7]],
//     ["", "perf", "fifth", [7]],
//     ["", "perf", "octave", [12]],
//     ["", "perf", "octave", [12]]
// ]
// let parallel5or8FailMot = ["contrary", "similar", "parallel", "oblique", "parallel"]
// let parallel5or8PassMot = ["contrary", "similar", "parallel", "oblique", "parallel"]
// console.log(parallel5or8(parallel5or8PassInt, parallel5or8PassMot))//pass
// console.log(parallel5or8(parallel5or8FailInt, parallel5or8FailMot))//fail [2,4]

// the independence functions (too much parallel)
const independenceYellow = motionArray => {
    let result = [false, [], []]
    for (let i = 1; i < motionArray.length; i++) {
        if (motionArray[i - 1] == "parallel" && motionArray[i] == "parallel") {
            result[1].push(`from pos. ${i - 1} to pos. ${i + 1} lacks independence`)
            result[2].push(i)
        }
    }
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: it's a'ight: not too parallel"
    }
    return result
}
const independenceRed = motionArray => {
    let result = [false, [], []]
    for (let i = 1; i < motionArray.length - 1; i++) {
        if (motionArray[i - 1] == "parallel" && motionArray[i] == "parallel" && motionArray[i + 1] == "parallel") {
            result[1].push(`write independant lines!: parallel from pos. ${i - 1} to ${i + 2}`)
            result[2].push(i + 1)
        }
    }
    if (!result[1].length) {
        result[0] = true
        result[1] = "pass: it's not way too parallel"
    }
    return result
}
// let independence3 = ["contrary", "similar", "parallel", "oblique", "similar"]
// let independence4 = ["similar", "parallel", "parallel", "oblique", "similar"]
// let independence5 = ["contrary", "parallel", "parallel", "parallel", "similar"]

// console.log(independenceYellow(independence3))//pass
// console.log(independenceYellow(independence4))//fail
// console.log(independenceRed(independence4))//pass
// console.log(independenceRed(independence5))//fail
const tests = {
    keyComb,
    lengthCF,
    deltaRange,
    deltaDissonantLeaps,
    dissonantOutlines,
    rangeCF,
    noRepetition,
    verticalDissonanceBass,
    verticalDissonanceUpper,
    detectUnisons,
    detectVoiceCrossing,
    verticalSpacingRed,
    verticalSpacingYellow,
    parallel5or8,
    direct5or8,
    independenceYellow,
    independenceRed
}
module.exports = tests