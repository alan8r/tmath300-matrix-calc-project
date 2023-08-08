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
    matrixControls = [],
    matrixOpControls = []

function main() {

  // generate and append the initial matrix to our matrices collection
  defaultMatrix = new Matrix(DEFAULTS.rows, DEFAULTS.cols+1, 'asc')
  matrices.push(defaultMatrix)
  defaultMatrix.generateMatrixTable('main_container')

  defaultOpSelector = new MatrixOpSelector()
  matrixOpControls.push(defaultOpSelector)

  secondMatrix = new Matrix(4,3,'asc')
  matrices.push(secondMatrix)
  secondMatrix.generateMatrixTable('main_container')

  // generate and append the controls for each matrix
  generateMatrixControls()
  addMatrixControlsToPage('main_container')

  document.getElementById('main_container').children[0].after(defaultOpSelector.divContainer)
  // create the buttons for adding or removing matrices beyond our initial default
  let buttonAddMatrix = document.createElement('button'),
      buttonRemoveMatrix = document.createElement('button')
  buttonCalculate = document.getElementById('calculate')
  
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
  console.debug('### ADD TEST ###')
  let aAdd = new Matrix(2,4,'rand'),
      bAdd = new Matrix(2,4,'asc'),
      cAdd = aAdd.add(bAdd)
  console.debug('matrix A:\n'+aAdd.toString())
  console.debug('matrix B:\n'+bAdd.toString())
  console.debug('A + B:\n'+cAdd.toString())
  console.debug('################')

  // test for the Matrix.subtract method
  console.debug('### SUBTRACT TEST ###')
  let aSub = new Matrix(2,4,'rand'),
      bSub = new Matrix(2,4,'asc'),
      cSub = aSub.subtract(bSub)
  console.debug('matrix A:\n'+aSub.toString())
  console.debug('matrix B:\n'+bSub.toString())
  console.debug('A - B:\n'+cSub.toString())
  console.debug('#####################')

  // test for the Matrix.multiply method
  console.debug('### MULTIPLY TEST ###')
  let aMult = new Matrix(3,3,'asc'),
      bMult = new Matrix(3,2,'asc'),
      cMult = aMult.multiply(bMult)
  console.debug('matrix A:\n'+aMult.toString())
  console.debug('matrix B:\n'+bMult.toString())
  console.debug('A * B:\n'+cMult.toString())
  console.debug('#####################')

  // test for the Matrix.transpose method
  console.debug('### TRANSPOSE TEST ###')
  let aTpose = new Matrix(3,2,'asc'),
      aaTpose = aTpose.transpose(),
      bTpose = new Matrix(3,3,'asc'),
      bbTpose = bTpose.transpose()
      
  console.debug('matrix A:\n'+aTpose.toString())
  console.debug('matrix A^T:\n'+aaTpose.toString())
  console.debug('matrix B:\n'+bTpose.toString())
  console.debug('matrix B^T:\n'+bbTpose.toString())
  console.debug('######################')

  //test for inverse method
  console.log('### INVERSE TEST ###')
  let invMatrix = new Matrix(2,2,'asc')

  console.log(invMatrix.toString())
  console.log()
  console.log(invMatrix.inverse().toString())

  //test for isSingular
  let isSingularMatrix = new Matrix(2,2,'rand') 
  console.log(isSingularMatrix.isSingular().toString())
  
}