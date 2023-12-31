// class representing matrix operatros

class MatrixOpSelector {
    options = [
        '[ + ]',
        '[ - ]',
        '[ * -> ]',
        '[ <- * ]'
    ]

    optionName = [
        'add',
        'subtract',
        'rightMultiply',
        'leftMultiply'
    ]

    // constructor that sets the elements of the matrix 

    constructor() {
        this.divContainer = document.createElement('div')
        this.divContainer.className = 'selectDivContainer'
        this.selectDOM = document.createElement('select')
        this.selectDOM.className = 'selectMatrixOp'
        this.divContainer.innerText = "Operation:\n"
        this.options.forEach(option=> {
            let optionDOM = document.createElement('option')
            optionDOM.value = option
            optionDOM.innerText = option
            this.selectDOM.appendChild(optionDOM)
        });

        this.divContainer.appendChild(this.selectDOM)
    }
}

generateMatrixOpControls = function() {
    for (let i = 0; i < matrices.length; i++)
        matrixOpControls.push(new MatrixOpSelector())
}