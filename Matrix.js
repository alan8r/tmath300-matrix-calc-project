/*
    Matrix.js 
    Class to represent and hold the information about a matrix
    Authors: Alan Thompson, Lwazi, Michael Mapanao
*/

class Matrix {

  constructor(rows, cols, mode='default') {
    this.rows = rows
    this.cols = cols

    this.tableDOM = null
    
    this.array = [];
    
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


  resizeRows(newRows) {
    if (newRows < 1) {
      console.error("array rows can not be smaller than 1")
      return 0
    }
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
    return 1
  }

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
    
    let row1 = this.array.length;
    let columns1 = this.array[0].length;
    let row2 = matrix.array.length;
    let columns2 = matrix.array[0].length;
    
    let result = [];
    for (let j = 0; j < row2; j++) {
      result.push([]);  
    }

    let summation = 0;

    for(let i = 0; i < row1; i++) {
      for (let j = 0; j < columns2; j++) {
        for (let k = 0; k < columns1; k++ ) {
          summation = summation + this.array[i][k] * matrix.array[k][j];
        }
        result[i][j] = summation;
        summation = 0
      }
    }

    let returnMatrix = new Matrix(result.length, result[0].length)
    
    // copy result matrix in to returnMatrix.array
    returnMatrix.array = result.slice()
    return returnMatrix
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

  inverse() {
    //create 2d array temp
    let a = this.getElemAt(1,1),
     b = this.getElemAt(2,1),
     c = this.getElemAt(1,2),
     d = this.getElemAt(2,2),
     determinant = (this.getElemAt(1,1) * this.getElemAt(2,2)) - (this.getElemAt(2,1) * this.getElemAt(1,2));
     console.log(a.toString())
     console.log(b.toString())
     console.log(c.toString())
     console.log(d.toString())
     console.log(determinant.toString())
     let temp = [];
     for (let i = 0; i < this.rows; i++) {
       temp[i] = [];
       for (let j = 0; j < this.cols; j++) {
           temp[i][j] = this.getElemAt(i+1,j+1);
       }
   }
   this.array[0][0] = temp[1][1];  // annoying 
   console.log("temp array ! :: " + temp);
    // let returnMatrix=new Matrix(this.rows, this.cols)

    // console.log("return matrix: " + returnMatrix);
    // console.log("end of reutn matrix");
    // for (let i = 0; i < this.rows; i++){
    //   for (let j = 0; j < this.cols; j++){
    //        temp.push(i,j) = returnMatrix.getElemAt(i+1,j+1);
    //      }
    //    }


    //   returnMatrix[0][0] = temp[2][1];
    //    returnMatrix.getElemAt(1,1) = temp[0][0];

    //    returnMatrix.getElemAt(1,2) = -1;
    //    returnMatrix.getElemAt(2,1)= -1;

    //  for (let i = 0; i < this.rows; i++)
    //   for (let j = 0; j < this.cols; j++)
    //    returnMatrix.array[i][j] = this.array[i][j] * (1/determinant)
    //     return returnMatrix
       return this.array;
 }

  isSingular() {
    // return if matrix is singular

    let determinant = (this.getElemAt(1,1) * this.getElemAt(2,2)) - (this.getElemAt(1,2) * this.getElemAt(2,1));

    if (this.rows != this.cols) {
      console.error("singular matrix only apply to square matrices.")
      return;
    }

      if (determinant != 0){
        return false;
      }
      else{return true}
  }

  isConsistent() {
    let determinant = (this.getElemAt(1,1) * this.getElemAt(2,2)) - (this.getElemAt(1,2) * this.getElemAt(2,1));

    if (determinant != 0){
      return false;
    }
    else{return 
      true}
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

  toString() {
    let sb = ""
    this.array.forEach(row=>sb+=row.toString().split(',').join('\t')+'\n')
    return sb
  }

  generateMatrixTable(parentId) {
    this.tableDOM = new MatrixTable(this, parentId)
  }
}
