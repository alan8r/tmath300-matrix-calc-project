/*
    Matrix.js 
    Class to represent and hold the information about a matrix
    Authors: Alan Thompson, Lwazi, Michael Mapanao
*/

class Matrix {

    constructor(rows, cols, mode='default') {
      // an attribute in the object to store the rows and columns
      this.rows = rows
      this.cols = cols
  
      // a reference to get from the matrix object to the on-screen HTML DOM elements that represent
      // the matrix object
      this.tableDOM = null
      
      this.array = [];
      
      /* 
          Initialize the 2d array that will store the actual matrix values
          by default, the "mode" parameter can be left blank or a few different modes can be set that determine
          what values the matrix is initialized containing.
          Modes are:
            'asc'   -- inserts ascending values starting with 1 in to each matrix cell, wraps per row
            'desc'  -- similar to 'asc', but in descending order instead of ascending
            'rand'  -- Sets a random value between 0 and 99 in each matrix cell
      */
      let val = 0;
      for (let i = 0; i < rows; i++) {
        this.array.push([])
        for (let j = 0; j < cols; j++) {                        
          if (mode.toLowerCase()==='asc')
            this.array[i].push(val++)
          else if (mode.toLowerCase()==='desc')
            this.array[i].push((rows*cols)-1-val++)
          else if (mode.toLowerCase()==='rand')
            this.array[i].push(Math.floor(Math.random()*100))
          else
            this.array[i].push(val)
        }
      }
    }
  
    
    // A helper method for resizing the rows of the matrix when the user scales the size down
    resizeRows(newRows) {
      
      // check to make sure the matrix has a minimum of 1 row
      if (newRows < 1) {
        console.error("array rows can not be smaller than 1")
        return 0
      }

      /* 
        There are effectively 2 cases for resizing the matrix rows
          case 1: row count is decreasing
          case 2: row count is increasing
        The following if branch handles those two cases, as different actions are required to scale
        the matrix larger or smaller
      */

      if (newRows < this.rows) {
        console.log('rows resize, newRows < rows')
        for (let i = 0; i < (this.rows - newRows); i++)
          this.array.pop()
      } else if (newRows >= this.rows) {
        for (let i = 0; i < (newRows - this.rows); i++) {
          this.array.push([])
          for (let j = 0; j < this.cols; j++) {
            this.array[this.rows+i].push(0)
          }
        }
      }

      this.rows = newRows

      // method returns 1 if successful
      return 1
    }
  

    
    // A helper method similar to the resizeRows method above, but for changing the number of columns the matrix has
    resizeCols(newCols) {
      
      if (newCols < 1) {
        console.error("array cols can not be smaller than 1")
        return 0
      }
      if (newCols < this.cols) {
        for (let i = 0; i < this.rows; i++)
          for (let j = 0; j < (this.cols - newCols); j++)
            this.array[i].pop()
      } else if (newCols >= this.cols) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < (newCols - this.cols); j++) {
            this.array[i].push(0)
          }
        }
      }
      this.cols = newCols
      return 1
    }
  
    resizeMatrix(newRows, newCols) {
      
      console.log('##########')
      console.log('-- Matrix resize -- ')
      console.log('~~~ before: '+this.rows+'x'+this.cols)
      console.log(this.toString())
      
      let rowsSuccess = this.resizeRows(newRows)
      let colsSuccess = this.resizeCols(newCols)
  
      if (rowsSuccess && colsSuccess) {
  
        if (this.tableDOM != null) {
          this.tableDOM.matrix = this;
          this.tableDOM.generateTableInnerStructure()
          this.tableDOM.refreshTable()
        }
  
        console.log('~~~ after:  '+this.rows+'x'+this.cols)
        console.log(this.toString())
        console.log('##########')
      } else {
        console.error('matrix resize failed')
        return 0
      }
    }
  
    getElemAt(indexRow, indexCol) {
      return this.array[indexCol-1][indexRow-1]
    }
  
    getRows() {
      return this.rows
    }
  
    getCols() {
      return this.cols
    }
  
    // Add 'this' Matrix to parameter 'matrix' and return new Matrix as result
    add(matrix) {
      
      // First we check to see if the dimensions of both matrices we are operating on are matching
      // as required by the definition of matrix addition
      if (this.rows != matrix.rows && this.cols != matrix.cols) {
        console.error("Cannot add matrices of different sizes")
        return
      }

      let returnMatrix=new Matrix(this.rows, this.cols)
      
      for (let i = 0; i < this.rows; i++)
        for (let j = 0; j < this.cols; j++)
          returnMatrix.array[i][j] = this.array[i][j] + matrix.array[i][j]
      return returnMatrix
    }
  
    // Subtract 'this' matrix from parameter 'matrix' and return new Matrix as result
    subtract(matrix) {
      // check to see if rows/columns match
      if (this.rows != matrix.rows && this.cols != matrix.cols) {
        console.error("Cannot add matrices of different sizes")
        return
      }
      // create a matrix to hold the result
      let returnMatrix=new Matrix(this.rows, this.cols)
      
      // iterate over all the values in both matrices and put the result in to the returnMatrix
      for (let i = 0; i < this.rows; i++)
        for (let j = 0; j < this.cols; j++)
          returnMatrix.array[i][j] = this.array[i][j] - matrix.array[i][j]
      return returnMatrix
    }

    // Multiply (crossmultiply) 'this' Matrix with parameter 'matrix' and return new Matrix as result
    multiply(matrix) {

      let matrixA = this.array
      let matrixB = matrix.array
      const numRowsA = matrixA.length;
      const numColsA = matrixA[0].length;
      const numRowsB = matrixB.length;
      const numColsB = matrixB[0].length;
  
      if (numColsA !== numRowsB) {
        return alert("Matrix dimensions do not properly match for cross-multiplication!")
        // throw new Error("Invalid matrix dimensions for multiplication.");
      }
      
      const result = new Array(numRowsA);
      for (let i = 0; i < numRowsA; i++) {
        result[i] = new Array(numColsB).fill(0);
      }
  
      for (let i = 0; i < numRowsA; i++) {
        for (let j = 0; j < numColsB; j++) {
          for (let k = 0; k < numColsA; k++) {
            result[i][j] += matrixA[i][k] * matrixB[k][j];
          }
        }
      }
      
      let resultMatrix = new Matrix(result.length, result[0].length)
      resultMatrix.array = result
      return resultMatrix;
    }
  
    // returns whether the Matrix is square (rows == cols)
    isSquare() {
      return (this.rows == this.cols)
    }
  
    // returns a new Matrix that is the transpose of 'this' Matrix
    transpose() {
      let result = new Matrix(this.cols, this.rows)
      result.tableDOM = this.tableDOM
      result.array = this.array[0].map((col, c) => this.array.map((row, r) => this.array[r][c]))
      return result
    }
  
    determinant2x2(matrix) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
  
  determinant(matrix) {
    
    if (!this.isSquare()) {
      console.error("Can't get DET of non-square matrix")
      return
    }

    let n = matrix.length;

    if (n === 1) {
        return matrix[0][0];
    } else if (n === 2) {
        return this.determinant2x2(matrix);
    } else {
      let det = 0;
      for (let i = 0; i < n; i++) {
          const minorMatrix = [];
          for (let j = 1; j < n; j++) {
              const row = matrix[j].slice(0, i).concat(matrix[j].slice(i + 1));
              minorMatrix.push(row);
          }
          det += matrix[0][i] * this.determinant(minorMatrix) * Math.pow(-1, i);
      }
      return det;
    }
  }

  // Check if a matrix is singular (non-invertible) based on its determinant
  isSingular() {
    return !this.isNonSingular()
  }

  isNonSingular() {
    if (!this.isSquare()) {
      return false
    }
    return (this.isSquare()) && (this.determinant(this.array)!=0)
  }
  
  
    isConsistent(matrix) {
    const det = this.determinant(matrix)
    
      if (this.determinant != 0){
        return true;
      }
      else{return 
        false}
    }
  
  
    rank() {
      //return the rank of the matrix
    }
  
    nullSpace(matrix) {
      const numeric = require('numeric');
  
      const rowEchelonForm = numeric.transpose(numeric.rref(matrix));
  
      const rowSpace = numeric.transpose(rowEchelonForm).map(row => numeric.div(row, numeric.norm2(row)));
  
      const nullSpace = rowSpace.filter(row => numeric.norm2(row) === 0);
  
      return nullSpace;
      
    }
  
    zeroArray() {
      for (let i = 0; i < this.array.length; i++)
        for (let j = 0; j < this.array[i].length; j++)
          this.array[i][j] = 0
      
    }
  
    toString() {
      let sb = ""
      this.array.forEach(row=>sb+=row.toString().split(',').join('\t')+'\n')
      return sb
    }
  
    generateMatrixTable(parentId) {
      this.tableDOM = new MatrixTable(this, parentId)
    }
  }
  