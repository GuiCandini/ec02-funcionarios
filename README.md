# EC02 — Sistema de Gestão de Funcionários

**Aluno:** Guilherme Gomes Candini

## Sobre o Projeto

Sistema de gerenciamento de funcionários desenvolvido com HTML e JavaScript.

Permite cadastrar, listar, editar e excluir funcionários, além de gerar relatórios com base nos dados cadastrados.

## Tecnologias Utilizadas

- HTML
- JavaScript
- Docker
- Git e GitHub

## Funcionalidades

- Cadastro e listagem de funcionários.
- Classe `Funcionario` com construtor, getters, setters e `toString()`.
- Edição e exclusão de funcionários.
- Eventos com funções anônimas e arrow functions.
- Relatórios utilizando `filter`, `map`, `reduce` e `new Set()`.

## Como Executar

É necessário ter o Docker Desktop instalado e funcionando.

1. Clone ou baixe este repositório.
2. Abra o terminal na pasta do projeto.
3. Execute:

```bash
docker compose up -d --build
```

4. Acesse no navegador:

http://localhost:8081

Para encerrar:

```bash
docker compose down
```

## Observação

Os dados são armazenados temporariamente em um array JavaScript. Ao atualizar a página, os registros são perdidos.

O projeto atende aos quatro exercícios propostos no estudo de caso de gerenciamento de funcionários.