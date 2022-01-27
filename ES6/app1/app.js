class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()
        
        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        // Array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        // Recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++) {

            // Recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            // Existe a possibilidade de haver índices que foram pulados/removidos
            // Nestes casos nós vamos pular esses índices
            if(despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    let exampleModalLabel = document.getElementById('exampleModalLabel')
    let modalBodyContent = document.getElementById('modal-body-content')
    let modalFooterContent = document.getElementById('modal-footer-content')
    let modalHeader = document.getElementById('modal-header')

    if(despesa.validarDados()) {
        bd.gravar(despesa)

        exampleModalLabel.innerHTML = 'Registro inserido com sucesso'
        modalBodyContent.innerHTML = 'Despesa foi cadastrada com sucesso!'
        modalFooterContent.innerHTML = 'Voltar'

        modalFooterContent.className = 'btn btn-success'
        modalHeader.className = 'modal-header text-success'

        // Dialog de sucesso
        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        // Dialog de erro
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas() {
    
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()

    // Selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    /*
    <tr>
        0 = <td>15/03/2018</td>
        1 = <td>Alimentação</td>
        <td>Compras do mês</td>
        <td>444.75</td>
    </tr>
    */

    // Percorrer o array despesas, listando cada despesa de forma dinâmenica
    despesas.forEach(function(d) {
        
        // console.log(d)
        
        // Criando a linha (tr)
        let linha = listaDespesas.insertRow()

        // Criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // Ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}