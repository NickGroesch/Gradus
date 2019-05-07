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
const counterpointSuite = an0b => {
    let testOb = {}
    abOb.relations.intervals.forEach((value, index) => {
        // if obj.keys.tostring[9]=1 run VertDissBass tests
        // else run VertDissUpper
    })
}

const testSuites = {
    cantusFirmusSuite
}
module.exports = testSuites