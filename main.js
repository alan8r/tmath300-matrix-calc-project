/*
    main.js
      Main codefile/entrypoint. 
      webapp effectively starts running from here after the index.html is opened/loaded.
*/

// flag to cause certain tests and other debugging features to run and enable
const DEBUG = true

const DEFAULTS = {
  rows: 3,
  cols: 3,
  cellWidth: 50,
  cellHeight: 50,
  cellPadding: 0
}

let matrices = [],
    matrixControls = [];

function main() {

  // generate and append the initial matrix to our matrices collection
  defaultMatrix = new Matrix(DEFAULTS.rows, DEFAULTS.cols+1, 'asc')
  matrices.push(defaultMatrix)
  defaultMatrix.generateMatrixTable('main_container')

  secondMatrix = new Matrix(4,3,'asc')
  matrices.push(secondMatrix)
  secondMatrix.generateMatrixTable('main_container')

  // generate and append the controls for each matrix
  generateMatrixControls()
  addMatrixControlsToPage('main_container')

  // create the buttons for adding or removing matrices beyond our initial default
  let buttonAddMatrix = document.createElement('button'),
      buttonRemoveMatrix = document.createElement('button')

  if (DEBUG) matrixOperationsTests()
}




// much more readability than having 'document.createElement' everywhere
function htmlObj(tag) {
  return document.createElement(tag);
}

// helper method for adding new matrices to the page
addNewMatrixToPage = function(matrix, parentId) {
  if (matrix.tableDOM===null) {
    matrix.generateMatrixTable(parentId)
    console.log('created new matrix table')
  }
  matrices.push(matrix)
  generateMatrixControls()
  addMatrixControlsToPage(parentId)
}

// helper method for testing different Matrix operations/methods
matrixOperationsTests = function() {
  
  // test for the Matrix.add method
  console.log('### ADD TEST ###')
  let aAdd = new Matrix(2,4,'rand'),
      bAdd = new Matrix(2,4,'asc'),
      cAdd = aAdd.add(bAdd)
  console.log('matrix A:\n'+aAdd.toString())
  console.log('matrix B:\n'+bAdd.toString())
  console.log('A + B:\n'+cAdd.toString())
  console.log('################')

  // test for the Matrix.subtract method
  console.log('### SUBTRACT TEST ###')
  let aSub = new Matrix(2,4,'rand'),
      bSub = new Matrix(2,4,'asc'),
      cSub = aSub.subtract(bSub)
  console.log('matrix A:\n'+aSub.toString())
  console.log('matrix B:\n'+bSub.toString())
  console.log('A - B:\n'+cSub.toString())
  console.log('#####################')

  // test for the Matrix.multiply method
  console.log('### MULTIPLY TEST ###')
  let aMult = new Matrix(3,3,'asc'),
      bMult = new Matrix(3,2,'asc'),
      cMult = aMult.multiply(bMult)
  console.log('matrix A:\n'+aMult.toString())
  console.log('matrix B:\n'+bMult.toString())
  console.log('A * B:\n'+cMult.toString())
  console.log('#####################')

  // test for the Matrix.transpose method
  console.log('### TRANSPOSE TEST ###')
  let aTpose = new Matrix(3,2,'asc'),
      aaTpose = aTpose.transpose(),
      bTpose = new Matrix(3,3,'asc'),
      bbTpose = bTpose.transpose()
      
  console.log('matrix A:\n'+aTpose.toString())
  console.log('matrix A^T:\n'+aaTpose.toString())
  console.log('matrix B:\n'+bTpose.toString())
  console.log('matrix B^T:\n'+bbTpose.toString())
  console.log('######################')

}