
class Funcionario {
    constructor(id, nome, idade, cargo, salario) {
        this._id = id;
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    // GETTERS
    get id() {
        return this._id;
    }

    get nome() {
        return this._nome;
    }

    get idade() {
        return this._idade;
    }

    get cargo() {
        return this._cargo;
    }

    get salario() {
        return this._salario;
    }

    // SETTERS
    set nome(valor) {
        this._nome = valor;
    }

    set idade(valor) {
        this._idade = valor;
    }

    set cargo(valor) {
        this._cargo = valor;
    }

    set salario(valor) {
        this._salario = valor;
    }

    // MÉTODO TOSTRING
    toString() {
        return `${this.nome} - ${this.idade} anos - ` +
               `${this.cargo} - R$ ${this.salario.toFixed(2)}`;
    }
}

let funcionarios = [];
let proximoId = 1;
let idEmEdicao = null;

const formulario = document.getElementById("formFuncionario");
const tabela = document.getElementById("tabelaFuncionarios");

const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCargo = document.getElementById("cargo");
const campoSalario = document.getElementById("salario");

const botaoCadastrar = document.getElementById("btnCadastrar");
const resultado = document.getElementById("resultadoRelatorio");

const formatarMoeda = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

function atualizarTabela() {
    tabela.innerHTML = "";

    funcionarios.forEach(funcionario => {
        const linha = document.createElement("tr");

        const dados = [
            funcionario.id,
            funcionario.nome,
            funcionario.idade,
            funcionario.cargo,
            formatarMoeda(funcionario.salario)
        ];

        dados.forEach(valor => {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");

        // Botão Editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";

        btnEditar.onclick = function() {
            editarFuncionario(funcionario.id);
        };

        // Botão Excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";

        btnExcluir.onclick = function() {
            excluirFuncionario(funcionario.id);
        };

        colunaAcoes.appendChild(btnEditar);
        colunaAcoes.appendChild(btnExcluir);

        linha.appendChild(colunaAcoes);
        tabela.appendChild(linha);
    });
}

// Busca um funcionário pelo ID
const buscarFuncionario = id =>
    funcionarios.find(funcionario => funcionario.id === id);

// Atualiza os dados utilizando setters
const atualizarFuncionario = (id, dados) => {
    const funcionario = buscarFuncionario(id);

    if (!funcionario) {
        return false;
    }

    funcionario.nome = dados.nome;
    funcionario.idade = dados.idade;
    funcionario.cargo = dados.cargo;
    funcionario.salario = dados.salario;

    return true;
};

// Remove um funcionário utilizando filter
const removerFuncionario = id => {
    const quantidadeAnterior = funcionarios.length;

    funcionarios = funcionarios.filter(
        funcionario => funcionario.id !== id
    );

    return funcionarios.length < quantidadeAnterior;
};

function salvarFuncionario() {
    if (!formulario.reportValidity()) {
        return;
    }

    const nome = campoNome.value.trim();
    const idade = Number(campoIdade.value);
    const cargo = campoCargo.value.trim();
    const salario = Number(campoSalario.value);

    if (
        nome === "" ||
        cargo === "" ||
        !Number.isInteger(idade) ||
        idade <= 0 ||
        !Number.isFinite(salario) ||
        salario < 0
    ) {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (idEmEdicao === null) {
        const funcionario = new Funcionario(
            proximoId,
            nome,
            idade,
            cargo,
            salario
        );

        funcionarios.push(funcionario);
        proximoId++;

        console.log(funcionario.toString());
        alert("Funcionário cadastrado com sucesso!");

    } else {
        const atualizado = atualizarFuncionario(
            idEmEdicao,
            { nome, idade, cargo, salario }
        );

        if (!atualizado) {
            alert("Funcionário não encontrado!");
            return;
        }

        alert("Funcionário atualizado com sucesso!");
    }

    idEmEdicao = null;
    botaoCadastrar.textContent = "Cadastrar";

    formulario.reset();
    atualizarTabela();
}

function editarFuncionario(id) {
    const funcionario = buscarFuncionario(id);

    if (!funcionario) {
        alert("Funcionário não encontrado!");
        return;
    }

    campoNome.value = funcionario.nome;
    campoIdade.value = funcionario.idade;
    campoCargo.value = funcionario.cargo;
    campoSalario.value = funcionario.salario;

    idEmEdicao = id;
    botaoCadastrar.textContent = "Salvar Alterações";

    alert("Altere os dados e salve as alterações.");
}

function excluirFuncionario(id) {
    const funcionario = buscarFuncionario(id);

    if (!funcionario) {
        alert("Funcionário não encontrado!");
        return;
    }

    if (confirm(`Deseja excluir ${funcionario.nome}?`)) {
        removerFuncionario(id);

        if (idEmEdicao === id) {
            idEmEdicao = null;
            formulario.reset();
            botaoCadastrar.textContent = "Cadastrar";
        }

        atualizarTabela();
        alert("Funcionário excluído com sucesso!");
    }
}

botaoCadastrar.onclick = function() {
    salvarFuncionario();
};

formulario.onsubmit = function(event) {
    event.preventDefault();
    salvarFuncionario();
};

document.getElementById("btnSalariosAltos")
    .onclick = function() {

        const selecionados = funcionarios.filter(
            funcionario => funcionario.salario > 5000
        );

        if (selecionados.length === 0) {
            resultado.textContent =
                "Nenhum funcionário recebe acima de R$ 5.000.";
            return;
        }

        const lista = selecionados.map(
            funcionario =>
                `${funcionario.nome} - ${formatarMoeda(funcionario.salario)}`
        );

        resultado.textContent =
            "Salários acima de R$ 5.000: " +
            lista.join(" | ");
    };

document.getElementById("btnMediaSalarial")
    .onclick = function() {

        if (funcionarios.length === 0) {
            resultado.textContent =
                "Nenhum funcionário cadastrado.";
            return;
        }

        const soma = funcionarios.reduce(
            (total, funcionario) =>
                total + funcionario.salario,
            0
        );

        const media = soma / funcionarios.length;

        resultado.textContent =
            "Média salarial: " + formatarMoeda(media);
    };

document.getElementById("btnCargos")
    .onclick = function() {

        const cargos = funcionarios.map(
            funcionario => funcionario.cargo.trim()
        );

        const cargosUnicos = [
            ...new Set(cargos)
        ];

        resultado.textContent = cargosUnicos.length > 0
            ? "Cargos únicos: " + cargosUnicos.join(", ")
            : "Nenhum funcionário cadastrado.";
    };

document.getElementById("btnMaiusculo")
    .onclick = function() {

        const nomes = funcionarios.map(
            funcionario => funcionario.nome.toUpperCase()
        );

        resultado.textContent = nomes.length > 0
            ? "Nomes em maiúsculo: " + nomes.join(", ")
            : "Nenhum funcionário cadastrado.";
    };
