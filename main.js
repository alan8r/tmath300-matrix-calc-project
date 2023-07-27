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

  let matrixMult1 = new Matrix(1, 2),
      matrixMult2 = new Matrix(2, 1)

  console.log('MULTIPLY:')
  console.log(matrixMult1.toString())
  console.log(matrixMult2.toString())
  console.log(matrixMult1.multiply(matrixMult2).toString())
}

