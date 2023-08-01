/*
    main.js
    Main codefile/entrypoint. App starts running from here.
*/

let test; // test array

let matrix1, matrix2;

let matrixTest1, matrixTest2;

function main() {
  
  test = new Matrix(3, 5)
  
  // console.log(`Rows: ${test.sizeRows()}\nCols: ${test.sizeCols()}`)
  // console.log(`Is square?: ${test.isSquare()}`)

  matrix1 = new Matrix(3,3);

  matrix2 = new Matrix(3,3);

  let matrix3 = matrix1.add(matrix2);
  console.log(matrix1.toString())
  console.log(matrix2.toString())
  console.log(matrix3.toString())

  let matrix4 = matrix1.subtract(matrix2);
  console.log(matrix4.toString())

  let transposeTest = new Matrix(3, 2, 'asc')

  console.log(transposeTest.toString())
  console.log(transposeTest.transpose().toString())

  matrixTest1 = new Matrix(2, 3, 'asc')
  matrixTest2 = new Matrix(2, 3, 'asc')
  
  let matrixTestTable1 = new MatrixTable(matrixTest1, 'main_container'),
      matrixTestTable2 = new MatrixTable(matrixTest2, 'main_container')
  
  matrixTest1.test('BEEP')
  // TODO: FIX MATRIX MULTIPLY STUFF
  /*
  let matrixMult1 = new Matrix(1, 2),
      matrixMult2 = new Matrix(2, 1)

  console.log('MULTIPLY:')
  console.log(matrixMult1.toString())
  console.log(matrixMult2.toString())
  console.log(matrixMult1.multiply(matrixMult2).toString())
  */
}

/*
function addMatrix(matrix, parentDivID, newTableID='') {
  let rows = matrix.sizeRows(),
      cols = matrix.sizeCols()

  let table = document.createElement('table')
  table.id = newTableID
  matrix.tableDOM = table

  for (let i=0; i <= rows; i++) {
    // extra run of loop to add the buttons to the table
    if (i>=rows) {
      // create all the needed html DOM elements
      let trTop = document.createElement('tr'),
          tdTop = document.createElement('td'),
          inputRows = document.createElement('input'),
          inputCols = document.createElement('input')
          
      
      // set up the DOM elements properties before appending them
      tdTop.innerHTML = 'Rows/Cols:<br />'
      inputRows.className = 'matrixSize'
      inputCols.className = 'matrixSize'
      inputRows.value = matrix.rows
      inputCols.value = matrix.cols
      tdTop.colSpan = matrix.cols
      tdTop.className = 'topExtra'
      tdTop.appendChild(inputRows)
      inputRows.after(' x ')
      tdTop.appendChild(inputCols)
      trTop.appendChild(tdTop)
      table.children[0].before(trTop)
          
      let storeOldValue = function() {
        this.oldValue = this.value
      }

      let changeRow = function() {
        if (isNaN(Number(this.value)) || this.value < 1) {
          this.value = this.oldValue
          alert("ERROR: Invalid input! Dimension must be a non-zero integer.");
        } else {

          let newRows = Math.floor(this.value)

          let newMatrix = new Matrix(newRows, matrix.cols)
          newMatrix.add(matrix)
          matrix = newMatrix
          addMatrix(matrix, parentDivID, newTableID)
          let parentDiv = document.getElementById(parentDivID)
          parentDiv.getElementsByTagName('table')[0].remove()

          console.log('row count changed to',this.value)
        }
      }

      let changeCol = function() {
        if (isNaN(Number(this.value))) {
          this.value = this.oldValue
          alert("ERROR: Invalid input! Dimension must be a non-zero integer.");
        } else {

        }
      }

      inputRows.onfocus = inputCols.onfocus = storeOldValue
      inputRows.onchange = changeRow
      inputCols.onchange = changeCol

      // used to disable buttons until click handlers are finished
      
      
      // used so I dont have to wrap everything after the 'if' clause in an 'else'
      continue
    }

    let tr = document.createElement('tr')
    tr.id = i

    for (let j=0; j < cols; j++) {
      
      let td = document.createElement('td'),
          input = document.createElement('input')
      
      input.value = matrix.array[j][i]
      
      // validate the input after user "clicks out" of input field, if valid then update the Matrix object
      input.onchange = function() {
        
        if (isNaN(Number(input.value))) {
          input.value = matrix.array[j][i]
          alert("ERROR: Invalid input! Matrix can only hold numbers.")
        } else {
          input.value = Number(input.value)
          matrix.array[j][i] = Number(input.value)
          console.log("Matrix changed:")
          console.log(matrix.toString())
        }
      }

      td.appendChild(input)
      tr.appendChild(td)
      
    }

    table.appendChild(tr)
    document.getElementById(parentDivID).appendChild(table)
    
  }
}
*/