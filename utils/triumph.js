const translators = require("./translators")
const tests = require("./tests")
const testsuites = require("./testsuites")
const dummy = { key: "C", midiArray: [60, 62, 64, 65, 67, 62, 65, 64, 62, 60] }
const analyze = require("../controller/index")
// this initial iteration of triumph will focus solely on the generation of a single upper counterpoint to a given cantus
let midiCantus = dummy.midiArray
// given our cantus we need to use create an array of potential arrays, then range them
let matrix = []
midiCantus.forEach((note, index) => {
    let column = []
    for (var i = note; i <= note + 21; i++) {
        column.push(i)
    }
    matrix.push(column)
})
// next we convert them into duals so we can keycomb them.
matrix.forEach((column, index) => {
    let pitch = translators.evalPitchArray(column, dummy.key);
    let dualColumn =
        translators.formatDual(column, pitch)
    matrix[index] = dualColumn
})
matrix.forEach(column => {
    let newColumn = []
    let trash = []
    let comb = tests.keyComb(column, dummy.key)[2]
    for (var i = comb.length - 1; i >= 0; i--) {
        trash.push(column.splice(comb[i], 1))
    }
})
// console.log("keycombed", matrix)

// we must format the midi cantus into duals for the remaining tests.
let cantusPitch = translators.evalPitchArray(midiCantus, dummy.key);
let dualCantus =
    translators.formatDual(midiCantus, cantusPitch)
// we have to slightly alter the functionality of the verticalDissonance function 
// to assess multiple notes against each voice by making each note an array of 
// iterations of that note equal to the length of the comparativematrix column
for (var i = 0; i < midiCantus.length; i++) {
    // console.log("note", dualCantus[i]);
    let trivialArray = []
    for (var j = 0; j < matrix[i].length; j++) {
        trivialArray.push(dualCantus[i])
    }
    let vertComb = new Set(tests.verticalDissonanceBass(translators.intervalCompare(trivialArray, matrix[i]))[2])
    vertComb = [...vertComb]
    let trash = []
    for (var k = vertComb.length - 1; k >= 0; k--) {
        trash.push(matrix[i].splice(vertComb[k], 1))
    }
    // console.log("dissonance combed", matrix[i])
}
// console.log("dissonance combed", matrix)

// having completed the combing we now need to assess entire linear counterpoints

// -----------------------------------------

// how can we use recursion to populate the mega-array of potential solutions at this point??
// let megaArray = []
// for (let i = 0; i = dualCantus.length; i++) {

// }
// recursion needs a general function that calls itself,
//  and a conditional to determine the case of bottoming out

// for 2 lines(one of which is fixed, one variable) if there are N options 
// for each of M variable value, there are N^M possibilities

// practice ala poornima--stack overflows

let arrOfArr = [["a", "b", "c"], ["A", "B", "C"], [1, 2, 3, 4], ["X", "Y", "Z"]]
// we are shooting for solutions=[[a,A,1][a,A,2],[a,A,3],[a,B,1]...]

// let arrOfArr = [[1, 2], [1, 2]]//return [[1,1],[1,2],[2,1],[2,2]]

let xxx = (aOA) => {
    let solutions = []
    let polymorphicBegin = ``
    let polymorphicMiddle = `solutions.push([`
    let polymorphicEnd = `])`
    for (let i = 0; i <= aOA.length; i++) {
        if (i == aOA.length) {
            let polyCode = (polymorphicBegin + polymorphicMiddle + polymorphicEnd)

            eval(polyCode)
        } else {
            let k = `j${i}`
            polymorphicBegin += `for(let j${i}=0; j${i}<aOA[${i}].length; j${i}++){`
            polymorphicEnd += `}`
            if (i == aOA.length - 1) {
                polymorphicMiddle += `aOA[${i}][${k}]`
            } else {
                polymorphicMiddle += `aOA[${i}][${k}],`
            }
        }
    }
    // console.log(polyCode)
    // eval(polyCode)
    return solutions
}
console.log(xxx(arrOfArr))
yyy = (aOA) => {
    let solutions = [];
    for (let j0 = 0; j0 < aOA.length; j0++) {
        //    run tests
        // if (fails test){remove element from array}
        // else{
        //// if(i bottoms out){
        //// evaluate solutions.push
        //// }else{
        //// keep up the recursion
        //// }
        // }
    }

    return solutions
}
// console.log(yyy(arrOfArr))
// yyy(arrOfArr)
// ----------------------------------------------
// let e = "me"
// eval(`console.log('hey its ${e}')`)

// now we need to formulate a general function that will run a test and 
// use the results to trim the 

// no repitition will run for now( it will need be be replaced with a more 
// sensitive function to allow the possibility of infrequent tying)