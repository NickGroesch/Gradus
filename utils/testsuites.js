const tests = require("./tests")
// given an analytical object, run the appropriate tests

// cantus only tests-- DO WE NEED MORE SPECIFICITY IN THE RETURN TO USE THE graphs.table?
const cantusFirmusSuite = anOb => {
    // result is boolean pass/fail, pass array of arrays, fail array of arrays
    // let result = [false, [], []]
    let keyComb = tests.keyComb(anOb.voices.duals[0].voice1, anOb.key)
    if (keyComb[0]) {
        let lengthCF = tests.lengthCF(anOb.voices.duals[0].voice1)
        if (lengthCF[0]) {
            let rangeCF = tests.rangeCF(anOb.voices.duals[0].voice1)
            if (rangeCF[0]) {
                let deltaRange = tests.deltaRange(anOb.voices.deltas[0].delta1)
                if (deltaRange[0]) {
                    let deltaDissLeaps = tests.deltaDissonantLeaps(anOb.voices.deltas[0].delta1)
                    if (deltaDissLeaps[0]) {
                        let dissOut = tests.dissonantOutlines(anOb.voices.duals[0].voice1, anOb.voices.deltas[0].delta1)
                        if (dissOut[0]) {
                            let noRep = tests.noRepetition(anOb.voices.duals[0].voice1)
                            if (noRep[0]) {
                                //     result[0] = true
                                //  result[2].push("cantusSuite passed")
                                return [true, "cantusSuite passed"]
                            } else { return noRep }
                        } else { return dissOut }
                    } else { return deltaDissLeaps }
                } else { return deltaRange }
            } else { return rangeCF }
        } else { return lengthCF }
    } else { return keyComb }
}

// full counterpoint tests -- WILL WE NEED TO MAKE A ROUGHLY EQUIVALENT testOB to the anOb?
// this first iteration will only run the relative tests, not the voice (cantus) tests
const counterpointSuite = anOb => {
    let testOb = { testResults: [] }
    // testing vertical intervals
    let duals = anOb.voices.duals
    let intervals = anOb.relations.intervals
    let motions = anOb.relations.motions
    intervals.forEach((value, index) => {
        let bass = false
        let obKey = Object.keys(value)[0]
        // checkto see if interval contains the bass
        if (Object.keys(value)[0][9] == 1) { bass = true }
        if (bass) {
            testOb.testResults.push({ [`vertDissBass${obKey}`]: tests.verticalDissonanceBass(intervals[index][obKey]) })
        }
        else {
            testOb.testResults.push({ [`vertDissUpper${obKey}`]: tests.verticalDissonanceUpper(intervals[index][obKey]) })
        }
    })
    // detect voice crossing
    for (let i = 0; i < duals.length - 1; i++) {
        testOb.testResults.push({ [`detectVoiceCrossing${i + 1}-${i + 2}`]: tests.detectVoiceCrossing(duals[i][`voice${i + 1}`], duals[i + 1][`voice${i + 2}`]) })
    }

    // detect unisons
    intervals.forEach((value, index) => {
        let obKey = Object.keys(value)[0]
        if (obKey[11] - obKey[9] == 1) {
            testOb.testResults.push({ [`detectUnisons${obKey}`]: tests.detectUnisons(intervals[index][obKey]) })
        }
    })
    // test vertSpaceRed
    intervals.forEach((value, index) => {
        let obKey = Object.keys(value)[0]
        if (obKey[11] - obKey[9] == 1) {
            testOb.testResults.push({ [`vertSpaceRed${obKey}`]: tests.verticalSpacingRed(intervals[index][obKey]) })
        }
    })
    // test vertSpaceYellow
    intervals.forEach((value, index) => {
        let obKey = Object.keys(value)[0]
        if (obKey[11] - obKey[9] == 1) {
            testOb.testResults.push({ [`vertSpaceYellow${obKey}`]: tests.verticalSpacingYellow(intervals[index][obKey]) })
        }
    })
    // parallel5or8--motions&intervals
    // direct5or8--motions&intervals
    //independenceRed--motions
    //independenceYellow--motions

    return testOb
}

const testSuites = {
    cantusFirmusSuite,
    counterpointSuite
}
module.exports = testSuites