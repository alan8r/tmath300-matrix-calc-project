// helper method for generating the controls per each matrix
generateMatrixControls = function() {
    if (matrixControls.length > 0) {
      matrixControls = []
      removeAllMatrixControls()
    }
    
    for (let i = 0; i < matrices.length; i++) {
      let divControl = htmlObj('div'),
          divRowsCols = htmlObj('div'),
          divButtons = htmlObj('div'),
          inputRows = htmlObj('input'),
          inputCols = htmlObj('input'),
          buttonRemoveMatrix = htmlObj('button')
      
      inputRows.value = matrices[i].rows
      inputCols.value = matrices[i].cols

      inputRows.type = inputCols.type = "Number"

      inputRows.className = inputCols.className = 'controls'
      // divControl.style.width = (matrices[i].array.length * 51) + 'px'
      divControl.className = 'matrixControl'
  
      divRowsCols.innerHTML = "Row/Cols:<br />"
      divRowsCols.appendChild(inputRows)
      divRowsCols.appendChild(inputCols)
      divButtons.appendChild(buttonRemoveMatrix)
      divControl.appendChild(divRowsCols)
      divControl.appendChild(divButtons)
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
          matrices[i].resizeMatrix(Number(this.value), matrices[i].cols)
        }
      }
  
      inputCols.onchange = function() {
        console.log('col change')
        if (isNaN(this.value) || this.value < 1) {
          this.value = this.oldValue
          alert(onchangeAlert)
        } else {
          this.value = Math.floor(this.value)
          matrices[i].resizeMatrix(matrices[i].rows, Number(this.value))
        }
      }

      buttonRemoveMatrix.innerText = 'Clear'

      buttonRemoveMatrix.onclick = function() {
        const bTable = this.parentElement.parentElement.parentElement.children[1]
         matrices.forEach(matrix=>{
          let matrixTable = matrix.tableDOM.getTable()
          console.log(bTable == matrixTable)
          if (bTable == matrixTable) {
            console.log('matrix zero\'d')
            matrix.zeroArray()
            matrix.tableDOM.refreshTable()
          }
        })
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