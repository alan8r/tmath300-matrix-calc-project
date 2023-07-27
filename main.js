/*
    main.js
    Main codefile/entrypoint. App strarts running from here.
*/

let test; // test array

function main() {
  
  test = new Matrix(3, 5)
  
  console.log(`Rows: ${test.sizeRows()}\nCols: ${test.sizeCols()}`)

}

