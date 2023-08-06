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


}

// helper method for generating the controls per each matrix
generateMatrixControls = function() {
  if (matrixControls.length > 0) {
    matrixControls = []
    removeAllMatrixControls()
  }
  
  for (let i = 0; i < matrices.length; i++) {
    let divControl = htmlObj('div'),
        inputRows = htmlObj('input'),
        inputCols = htmlObj('input')
    
    inputRows.value = matrices[i].rows
    inputCols.value = matrices[i].cols
    inputRows.className = inputCols.className = 'controls'
    // divControl.style.width = (matrices[i].array.length * 51) + 'px'
    divControl.className = 'matrixControl'

    divControl.innerHTML = "Row/Cols:<br />"
    divControl.appendChild(inputRows)
    divControl.appendChild(inputCols)
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
        matrices[i].rows = new Number(this.value)
        matrices[i].resizeArray()
      }
    }

    inputCols.onchange = function() {
      console.log('col change')
      if (isNaN(this.value) || this.value < 1) {
        this.value = this.oldValue
        alert(onchangeAlert)
      } else {
        this.value = Math.floor(this.value)
        matrices[i].cols = Number(this.value)
        matrices[i].resizeArray()

        // let unitWidth = DEFAULTS.cellWidth + DEFAULTS.cellPadding
        //divControl.style.width = (matrices[i].array.length * unitWidth)  + 'px'
      }
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