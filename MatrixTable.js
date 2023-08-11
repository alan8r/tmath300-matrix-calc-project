class MatrixTable {
    constructor(matrix, parentId, inputsEnabled=true) {
        this.matrix = matrix
        this.divTable = document.createElement('div')
        this.divTable.className = 'tableContainer'
        this.table = document.createElement('table')
        this.divTable.appendChild(this.table)
        document.getElementById(parentId).appendChild(this.divTable)
        this.generateTableInnerStructure(inputsEnabled)
        this.updateInputFields()
    }

    generateTableInnerStructure(inputsEnabled=true) {
        if (this.table.children.length >= 1)
            this.table.children[0].remove()

        let tableBody = document.createElement('tbody')

        for (let r = 0; r < this.matrix.rows; r++) {
            let tr = document.createElement('tr')
            for (let c = 0; c < this.matrix.cols; c++) {
                let td = document.createElement('td'),
                    input = document.createElement('input')
                    
                input.style.width = DEFAULTS.cellWidth + 'px'
                input.style.height = DEFAULTS.cellHeight + 'px'

                // input.type = 'number'

                if (!inputsEnabled) input.disabled = true;

                input.onclick = function() {
                    this.oldValue = this.value
                }

                let _this = this
                input.onchange = function() {
                    if (isNaN(this.value)||this.value===''||this.value===' ') {
                        alert('matrix value must be a number')
                        this.value = this.oldValue
                    } else {
                        _this.changeMatrixArray(r, c, this.value, this.oldValue)
                    }
                }

                input.ondragstart = function(event) {
                    event.preventDefault()
                }

                td.appendChild(input)
                tr.appendChild(td)
            }
            tableBody.append(tr)
        }
        this.table.appendChild(tableBody)
    }

    changeMatrixArray(row, col, value, oldValue) {
        this.matrix.array[row][col] = Number(value)
        console.log('matrix changed from '+oldValue+' to '+value+' @ r'+(row+1)+'c'+(col+1))
        console.log(this.matrix.toString())
    }
    
    updateInputFields() {
        let inputs = this.table.getElementsByTagName('input')
        let incr = 0
        let rows = this.matrix.getRows()
        let cols = this.matrix.getCols()
        for(let i = 0; i < rows; i++)
            for (let j = 0; j < cols; j++) {
                inputs[incr++].value = this.matrix.array[i][j]
            }
    }

    refreshTable() {
        this.generateTableInnerStructure()
        this.updateInputFields()
    }

    getTable() {
        return this.table
    }
}