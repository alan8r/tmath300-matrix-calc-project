class MatrixTable {
    constructor(matrix, parentId) {
        this.matrix = matrix
        this.table = document.createElement('table')
        document.getElementById(parentId).appendChild(this.table)
        this.generateTableInnerStructure()
        this.updateInputFields()
    }

    generateTableInnerStructure() {
        if (this.table.children.length >= 1)
            this.table.children[0].remove()

        let tableBody = document.createElement('tbody')

        for (let r = 0; r < this.matrix.rows; r++) {
            let tr = document.createElement('tr')
            for (let c = 0; c < this.matrix.cols; c++) {
                let td = document.createElement('td'),
                    input = document.createElement('input')
                    
                td.style.width = DEFAULTS.cellWidth + 'px'
                td.style.height = DEFAULTS.cellHeight + 'px'
                // td.style.padding = DEFAULTS.cellPadding + 'px'
                td.style.margin = DEFAULTS.cellPadding + 'px'
                input.style.width = (DEFAULTS.cellWidth) + 'px'
                input.style.height = (DEFAULTS.cellHeight) + 'px'

                td.appendChild(input)
                tr.appendChild(td)
            }
            tableBody.append(tr)
        }
        this.table.appendChild(tableBody)
    }
    
    updateInputFields() {
        let inputs = this.table.getElementsByTagName('input')
        for(let j = 0; j < this.matrix.cols; j++)
            for (let i = 0; i < this.matrix.rows; i++)    
                inputs[j*this.matrix.rows+i].value = this.matrix.array[j][i]
    }

    refreshTable() {
        this.generateTableInnerStructure()
        this.updateInputFields()
    }

    
}