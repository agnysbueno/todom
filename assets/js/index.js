let tarefas = [
    {
        id: 1,
        texto: "Elaborar questões",
        prioridade: 3,
        feito: true,
    },
    {
        id: 2,
        texto: "Montar o questionário",
        prioridade: 3,
        feito: true,
    },
    {
        id: 3,
        texto: "Divulgar o questionário",
        prioridade: 1,
        feito: false,
    },
    {
        id: 4,
        texto: "Analisar respostas",
        prioridade: 2,
        feito: false,
    },
]

const render = tarefas => {

    //Capturar o elemento que contém a lista de tarefas
    let table = document.getElementById("table");
    
    //alternativa para o document.getElementById, querySelector pega pelo seletor do css, por isso é mais flexível
    //table = document.querySelector("#table")

    //Limpar a lista
    //table.innerHTML = "";
    table.innerText = "";

    //Criar a lista de tarefas
    for (let tarefa of tarefas) {
        
        //criando uma linha de tabela
        let row = document.createElement("tr");

        //Criar o input checkbox
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");

        //Criar a célula que vai conter o checkbox
        let tdCheck = document.createElement("td");

        //Adicionar o checkbox ao td
        tdCheck.appendChild(checkbox)

        //Adicionar tdCheck à linha
        row.appendChild(tdCheck);

        //Criar elemento texto
        let tdTexto = document.createElement("td");
        tdTexto.innerText = tarefa.texto;
        row.appendChild(tdTexto);

        //Criar td de ações
        let tdAcoes = document.createElement("td");
        let i = document.createElement("i");
        i.className = "material-icons";
        i.innerText = "delete";
        tdAcoes.appendChild(i);
        row.appendChild(tdAcoes);

        tdTexto.innerHTML = tarefa.texto;

        //adicionando a linha na tabela
        table.appendChild(row);


        //alternativa para adicionar conteúdo a essa linha
        // row.innerHTML = `
        //     <td>
        //         <input type="checkbox">
        //     </td>
        //     <td>
        //         ${tarefa.texto}
        //     </td>
        //     <td>
        //         <i class="material-icons">delete</i>
        //     </td>`
    }
}

//Capturar elementos importantes da página
let form = document.getElementById("form"); //capturar o formulário
let table = document.getElementById("table"); //capturar a lista

const create = (texto, prioridade) => {
    return tarefa = {
        id: tarefas[tarefas.length - 1].id + 1,
        texto, //quando o atributo tem o mesmo nome da variável, não é necessário colocar "texto: texto,", pode ser feito direto
        prioridade,
        feito: false
    }
}

//FORMA 1
// form.onsubmit = evt => {
//     evt.preventDefault();
// }

//FORMA 2
form.addEventListener("submit", (evt) => {
    
    //Evitar o comportamento padrão de um formulário
    evt.preventDefault();

    //Capturar texto digitado pelo usuário
    let texto = document.getElementById("tf_2do").value;

    //Testando se o texto é vazio
    if (texto.trim() == ''){
        return;
    }
        
    //Verificar se existe prioridade settada nesse texto
    let strInicio = texto.substr(0,3);
    let prioridade;
    switch (strInicio) {
        case "#1 ":
            prioridade = 1;
            texto = texto.slice(3);
            break;

        case "#2 ":
            prioridade = 2;
            texto = texto.slice(3);
            break;

        case "#3 ":
            prioridade = 3;
            texto = texto.slice(3);
            break;

        default:
            prioridade = 1;
            break;
    }

    //Criar o objeto de tarefa, sabendo o texto e a prioridade
    let novaTarefa = create(texto, prioridade);

    //Adicionar o objeto tarefa ao array de tarefas
    tarefas.push(novaTarefa);

    //Renderizar a nova lista
    render(tarefas);

    //Limpar campo de texto
    document.getElementById("tf_2do").value = "";
});

render(tarefas);