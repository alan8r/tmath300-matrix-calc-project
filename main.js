/*
    main.js
    Main codefile/entrypoint. App starts running from here.
*/

let test; // test array

let matrix1, matrix2;

function main() {
  
  test = new Matrix(3, 5)
  
  console.log(`Rows: ${test.sizeRows()}\nCols: ${test.sizeCols()}`)
  console.log(`Is square?: ${test.isSquare()}`)

  matrix1 = new Matrix(3,3);

  matrix2 = new Matrix(3,3);

  let matrix3 = matrix1.add(matrix2);
  console.log(matrix1.toString())
  console.log(matrix2.toString())
  console.log(matrix3.toString())

  let matrix4 = matrix1.subtract(matrix2);
  console.log(matrix4.toString())

  let transposeTest = new Matrix(3, 2)

  console.log(transposeTest.transpose().toString())

  addMatrix(matrix1, "main_container", "table1")


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

function addMatrix(matrix, parentDivID, newTableID) {
  let rows = matrix.sizeRows(),
      cols = matrix.sizeCols()

  let table = document.createElement('table')
  table.id = newTableID
  matrix.tableDOM = table

  for (let i=0; i <= rows; i++) {
    // extra run of loop to add the buttons to the table
    if (i>=rows) {
      // create all the needed html DOM elements
      let trExtra = document.createElement('tr'),
          tdAddRow = document.createElement('td'),
          tdAddCol = document.createElement('td'),
          tdAddBoth = document.createElement('td'),
          buttonAddRow = document.createElement('button'),
          buttonAddCol = document.createElement('button'),
          buttonAddBoth = document.createElement('button')
      
      // set up the DOM elements properties before appending them
      buttonAddRow.innerText = '+'
      buttonAddCol.innerText = '+'
      buttonAddBoth.innerText = '+'
      buttonAddRow.disabled = true
      buttonAddCol.disabled = true
      buttonAddBoth.disabled = true
      tdAddRow.colSpan = 3
      tdAddRow.style.textAlign = "center"
      tdAddCol.rowSpan = 3

      // append all the DOM elements to their appropriate parent element
      tdAddRow.appendChild(buttonAddRow)
      tdAddCol.appendChild(buttonAddCol)
      tdAddBoth.appendChild(buttonAddBoth)
      table.children[0].appendChild(tdAddCol)
      trExtra.appendChild(tdAddRow)
      trExtra.appendChild(tdAddBoth)
      table.appendChild(trExtra)
      
      // used so I dont have to wrap everything after the 'if' clause in an 'else'
      continue
    }

    let tr = document.createElement('tr')
    tr.id = i

    for (let j=0; j < cols; j++) {
      
      let td = document.createElement('td'),
          input = document.createElement('input')
      
      input.value = matrix.array[i][j]
      
      // validate the input after user "clicks out" of input field, if valid then update the Matrix object
      input.onchange = function() {
        
        if (isNaN(Number(input.value))) {
          input.value = matrix.array[i][j]
          alert("ERROR: Invalid input! Matrix can only hold numbers.")
        } else {
          input.value = Number(input.value)
          matrix.array[i][j] = Number(input.value)
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