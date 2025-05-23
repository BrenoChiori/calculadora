function teclas(event) {
    const teclasSelect = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', 'Backspace']
    const teclaEnter = ['Enter']

    if (!teclasSelect.includes(event.key)) {
        event.preventDefault()
    }

    if (teclaEnter.includes(event.key)) {
        calcula()
    }
}

function teclasSelecionadas(tecla) {
    if(tecla == "c") {
        return document.getElementById("inputCalc").value = ""
    }

    let currentValue = document.getElementById("inputCalc").value
    document.getElementById("inputCalc").value = currentValue += tecla
}

function calcula() {
    let calculoCompleto = document.getElementById("inputCalc").value
    let calculoSeparado = calculoCompleto.match(/\d+|[+\-*/]/g)
    let resultado = 0
    let operacao = ["*", "/", "-", "+"]

    if(calculoSeparado.length <= 2 || operacao.includes(calculoSeparado[0]) || operacao.includes(calculoSeparado[calculoSeparado.length - 1]) ) {
        return document.getElementById("calc-result").innerText = "Expressão mal formada"
    }

    if(calculoCompleto.includes("/0")) {
        return document.getElementById("calc-result").innerText = "não e possivel dividir por 0"
    }

    while (calculoSeparado.includes("*") || calculoSeparado.includes("/")) {

        for (let j = 0; j < calculoSeparado.length; j++) {
            let valor = calculoSeparado[j]
            let valor1, valor2

            switch (valor) {
                case '*':
                    valor1 = parseInt(calculoSeparado[j - 1])
                    valor2 = parseInt(calculoSeparado[j + 1])
                    resultado = valor1 * valor2
                    calculoSeparado[j] = resultado.toString()
                    calculoSeparado.splice(j + 1, 1)
                    calculoSeparado.splice(j - 1, 1)
                    resultado = 0
                    break;

                case '/':
                    valor1 = parseInt(calculoSeparado[j - 1])
                    valor2 = parseInt(calculoSeparado[j + 1])
                    resultado = valor1 / valor2
                    calculoSeparado[j] = resultado.toString()
                    calculoSeparado.splice(j + 1, 1)
                    calculoSeparado.splice(j - 1, 1)
                    resultado = 0
                    break;
            }

        }

    }

    if (calculoSeparado.length > 1) {
        for (let i = 0; i < calculoSeparado.length; i++) {
            let valorUnico = calculoSeparado[i]
            let numero1, numero2

            switch (valorUnico) {
                case "+":
                    if (resultado == 0) {
                        numero1 = parseInt(calculoSeparado[i - 1])
                    } else {
                        numero1 = resultado
                    }
                    numero2 = parseInt(calculoSeparado[i + 1])
                    resultado = numero1 + numero2
                    break;

                case '-':
                    if (resultado == 0) {
                        numero1 = parseInt(calculoSeparado[i - 1])
                    } else {
                        numero1 = resultado
                    }
                    numero2 = parseInt(calculoSeparado[i + 1])
                    resultado = numero1 - numero2
                    break;
            }
        }
    } else {
        resultado = calculoSeparado[0]
    }

    console.log(`Resultado final ${resultado}`)

    document.getElementById("inputCalc").value = resultado.toString()
    document.getElementById("calc-result").innerText = `Resultado de ${calculoCompleto} = ${resultado}`
}
