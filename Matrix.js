/*
    Matrix.js 
    Class to represent and hold the information about a matrix
    Authors: Alan Thompson, 
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

  add(matrix) {
    if (this.rows != matrix.rows && this.cols != matrix.cols) {
      console.error("Cannot add matrices of different sizes")
      return
    }
    let returnMatrix=new Matrix(this.rows, this.cols)
    for (let j=0; j<this.cols; j++) {
      for (let i=0; i<this.rows; i++) {
        returnMatrix.array[j][i] = this.array[j][i] + matrix.array[j][i]
      }
    }
    return returnMatrix
  }

  subtract(matrix) {
    if (this.rows != matrix.rows && this.cols != matrix.cols) {
      console.error("Cannot subtract matrices of different sizes")
      return
    }
    let returnMatrix=new Matrix(this.rows, this.cols)
    for (let j=0; j<this.cols; j++) {
      for (let i=0; i<this.rows; i++) {
        returnMatrix.array[j][i] = this.array[j][i] - matrix.array[j][i]
      }
    }
    return returnMatrix
  }

  multiply(matrix) {
    // multiply this with matrix (crossproduct)
    
    var row1 = this.array.length;

    var columns1 = this.array[0].length;

    var row2 = matrix.array.length;

    var columns2 = matrix.array[0].length;

    
    var result = [];
    for (let j = 0; j < row2; j++) {
      result.push([]);  
    }
    
    // var result = new Array(row1, row2)

    var summation = 0;

    console.log('row1: ',row1,'row2: ',row2,'columns2: ',columns2)

    for(var i = 0; i < row1; i++) {

      for (var j = 0; j < columns2; j++) {

        for (var k = 0; k < columns1; k++ ) {
          summation = summation + this.array[i][k] * matrix.array[k][j];
        }

        console.log(result[i][j])
        console.log(summation)
        result[i][j] = summation;
        
        summation = 0
      }
    }
    return result
  }
    

  isSquare() {
    return (this.rows == this.cols)
  }

  transpose() {
    // return transposed matrix ("right rotation, flip on vertical axis")
    let result = new Matrix(this.cols, this.rows)
    result.array = this.array[0].map((col, c) => this.array.map((row, r) => this.array[r][c]))
    return result
  }

  inverse() {
    // return inverse of this
  }

  isSingular() {
    // return if matrix is singular
  }

  isConsistent() {
    // return if matrix is consistent
  }

  rank() {
    //return the rank of the matrix
  }

  nullSpace() {
    //return the nullspace of the matrix
  }

  toString() {
    //return this.array.toString();
    let sb = "";
    for (let j=0; j<this.cols; j++) {
      sb += this.array[j].toString().split(',').join('\t')
      sb += '\n'
    }
    return sb;
  }
}
