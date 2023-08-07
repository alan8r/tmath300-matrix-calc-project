/*
    main.js
    Main codefile/entrypoint. App effectively starts running from here.
*/

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

  /*#######################################
  # testing matrix method stuff down here #
  #######################################*/
  
  console.log('### ADD TEST ###')
  let aAdd = new Matrix(2,4,'rand'),
      bAdd = new Matrix(2,4,'asc'),
      cAdd = aAdd.add(bAdd)
  console.log('matrix A:\n'+aAdd.toString())
  console.log('matrix B:\n'+bAdd.toString())
  console.log('A + B:\n'+cAdd.toString())
  console.log('################')

  console.log('### SUBTRACT TEST ###')
  let aSub = new Matrix(2,4,'rand'),
      bSub = new Matrix(2,4,'asc'),
      cSub = aSub.subtract(bSub)
  console.log('matrix A:\n'+aSub.toString())
  console.log('matrix B:\n'+bSub.toString())
  console.log('A - B:\n'+cSub.toString())
  console.log('#####################')

  console.log('### MULTIPLY TEST ###')
  let aMult = new Matrix(3,3,'asc'),
      bMult = new Matrix(3,2,'asc'),
      cMult = aMult.multiply(bMult)
  console.log('matrix A:\n'+aMult.toString())
  console.log('matrix B:\n'+bMult.toString())
  console.log('A * B:\n'+cMult.toString())
  console.log('#####################')

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

// helper method for generating the controls per each matrix
generateMatrixControls = function() {
  if (matrixControls.length > 0) {
    matrixControls = []
    removeAllMatrixControls()
  }
  
  for (let i = 0; i < matrices.length; i++) {
    let divControl = htmlObj('div'),
        divRowsCols = htmlObj('div'),
        divButtons = htmlObj('div'),
        inputRows = htmlObj('input'),
        inputCols = htmlObj('input'),
        buttonRemoveMatrix = htmlObj('button')
    
    inputRows.value = matrices[i].rows
    inputCols.value = matrices[i].cols
    inputRows.className = inputCols.className = 'controls'
    // divControl.style.width = (matrices[i].array.length * 51) + 'px'
    divControl.className = 'matrixControl'

    divRowsCols.innerHTML = "Row/Cols:<br />"
    divRowsCols.appendChild(inputRows)
    divRowsCols.appendChild(inputCols)
    divButtons.appendChild(buttonRemoveMatrix)
    divControl.appendChild(divRowsCols)
    divControl.appendChild(divButtons)
    matrixControls.push(divControl)

    inputRows.onclick = inputCols.onclick = function() {
      this.oldValue = this.value;
    }

    let onchangeAlert = 'Matrix dimension must be a non-zero number!'

    inputRows.onchange = function() {
      console.log('row change')
      if (isNaN(this.value) || this.value < 1) {
        this.value = this.oldValue
        alert(onchangeAlert)
      } else {
        this.value = Math.floor(this.value)
        matrices[i].resizeMatrix(Number(this.value), matrices[i].cols)
      }
    }

    inputCols.onchange = function() {
      console.log('col change')
      if (isNaN(this.value) || this.value < 1) {
        this.value = this.oldValue
        alert(onchangeAlert)
      } else {
        this.value = Math.floor(this.value)
        matrices[i].resizeMatrix(matrices[i].rows, Number(this.value))
      }
    }

    buttonRemoveMatrix.innerText = 'X'
    buttonRemoveMatrix.onclick = function() {
      console.log(this)
    }
  }
}

removeAllMatrixControls = function() {
  document.getElementById('main_container').childNodes.forEach(div=>{
    let innerDiv = div.children[0]
    if (innerDiv.localName==='div') div.children[0].remove()
  })
}

// helper method for adding the generated controls to the page
addMatrixControlsToPage = function(parentId) {
  let container = document.getElementById(parentId)
  for (idx in matrixControls) {
    container.children[idx].children[0].before(matrixControls[idx])
  }
}

// much more readability than having 'document.createElement' everywhere
function htmlObj(tag) {
  return document.createElement(tag);
}

addNewMatrixToPage = function(matrix, parentId) {
  if (matrix.tableDOM===null) {
    matrix.generateMatrixTable(parentId)
    console.log('created new matrix table')
  }
  matrices.push(matrix)
  generateMatrixControls()
  addMatrixControlsToPage(parentId)
}