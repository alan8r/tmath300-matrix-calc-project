/*
    Matrix.js 
    Class to represent and hold the information about a matrix
*/

class Matrix {
  
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    
    this.array = [];
    for (let j=0; j<cols; j++) {
      this.array.push([])
      for (let i=0; i<rows; i++)
        this.array[j].push(j*rows+i)
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
}
