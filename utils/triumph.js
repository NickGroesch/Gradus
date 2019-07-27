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

// WE NEED TO COMB MORE TO REDUCE THE TIME AND SPACE COMPLEXITY TO MANAGEABLE LEVELS

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

let combineArrayArrays = (aOA) => {
    let solutions = []
    let polymorphicBegin = ``
    let polymorphicMiddle = `solutions.push([`
    let polymorphicEnd = `])`
    for (let i = 0; i <= aOA.length; i++) {
        if (i == aOA.length) {
            let polyCode = (polymorphicBegin + polymorphicMiddle + polymorphicEnd)
            console.log(polyCode)
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
    return solutions
}
// console.log(combineArrayArrays(arrOfArr))

// RECURSION PRACTICE----------------------------------------
// Lets make a "factorial of 2= ",factorial
let factorial = num => {
    if (num == 1) {
        return 1
    } else {
        answer = num * factorial(num - 1)
    }
    return answer
}
// console.log("factorial of 2= ", factorial(2))
// console.log("factorial of 3= ", factorial(3))
// console.log("factorial of 4= ", factorial(4))
// console.log("factorial of 5= ", factorial(5))
// console.log("factorial of 6= ", factorial(6))

// LETS MAKE A POWER Function
let power = (n, m) => {
    if (m == 0) { return 1 } else { return n * power(n, m - 1) }
}
// console.log("3squared", power(3, 2))
// console.log("2cubed", power(2, 3))
// console.log("2tothe8", power(2, 8))
// console.log("13tothe7", power(13, 7))

// NOW DEVELOP A FORM THAT WILL TRIM ARRAYS as it goes
let arrLetNum = [[1, "a", 2, 3], [1, 2, "b", "c", 3], [1, "c", 2, "b", 3], [1, 2, 3, "a", "b", "c"]]//solution.length=81

let typeTest = (item) => typeof (item) == "number"

let inner = (branches, array) => {
    for (let j = 0; j < array[0].length; j++) { }
    unshift
}
let testArray = (array) => {
    let test = array
    let testLength = test.length
    let final = []
    let temp = [[]]
    for (let i = 0; i < testLength; i++) {
        let local = []
        // if (i == array.length) {
        // }
        // temp.push([])
        // console.log(`iteration ${i}`, temp)

        for (let j = 0; j < temp.length; j++) {
            for (let k = 0; k < test[0].length; k++) {
                if (i > 0) {
                    if (typeTest(test[0][k])) { local.push([...temp[j], test[0][k]]) }
                } else {
                    if (typeTest(test[0][k])) { local.push([test[0][k]]) }
                }
                // console.log("item", test[0][j])
            }
        }
        temp = local
        test.shift()
        console.log(temp)
    }
}
testArray(arrLetNum)
// TESTING PSUEDOCODE
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
=======



// ----------------------------------------------
// let e = "me"
// eval(`console.log('hey its ${e}')`)

// now we need to formulate a general function that will run a test and 
// use the results to trim the 

// no repitition will run for now( it will need be be replaced with a more 
// sensitive function to allow the possibility of infrequent tying)