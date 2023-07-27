/*
    Matrix.js 
    Class to represent and hold the information about a matrix
    Authors: Alan Thompson, Lwazi, Michael Mapanao
*/

class Matrix {
  
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    
    this.array = [];
    for (let j=0; j<cols; j++) {
      this.array.push([])
      for (let i=0; i<rows; i++) {
        this.array[j].push(j*rows+i)
        
      }
    }
    this.DOM_init();
  }

  DOM_init() {
    this.DOM_outerDiv = document.createElement('div');
    this.DOM_table = document.createElement('table');
    this.DOM_inputs = [];
    for (let j=0; j<this.cols; j++) {
      this.DOM_inputs.push([]);
      for (let i = 0; i<this.rows; i++)
        this.DOM_inputs[j].push(document.createElement('input'));
    }
  }  

  getElemAt(indexRow, indexCol) {
    return this.array[indexCol-1][indexRow-1]
  }

  DOM_update() {
    // update the actual html matrix 
  }

  sizeRows() {
    return this.rows
  }

  sizeCols() {
    return this.cols
  }

  matrixAdd(matrix) {
    // add this to matrix 
  }

  matrixSubtract(matrix) {
    // subtract this from matrix
  }

  multiply(matrix1, matrix2){

    var row1 = matrix1.length;

    var columns1 = matrix1[0].length;

    var row2 = matrix2.length;

    var columns2 = matrix2[0].length;

    var result = new Array(row1,row2);

    var summation = 0;

    for(var i = 0; r < row1; i++) {

      for (var j = 0; j < columns2; j++) {

        for (var k = 0; k < columns1; k++ ) {

          summation = summation + matrix1[i][k] * matrix2[k][j];
      }

      result[i][j] = summation;

      summation = 0

    }

  }
    return result;

}


}
