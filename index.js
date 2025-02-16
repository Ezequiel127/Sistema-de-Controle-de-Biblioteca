let listaDeLivros = [];
let listaDeUsuarios = [];
let listaDeEmprestimos = [];

while (true) {
    console.log(
        "opção 1: cadastrar livros \nopção 2: cadastrar usuario \nopcão 3: realizar emprestimos de livros \nopcão 4: registar devolução de livros \nopção 5: calcular multas por atraso na devolução \nopção 6: exibir relatorios\n"
    );
    let opcoes = Number(prompt("digite a opção desejada: "));

    switch (opcoes) {
        case 1:
            console.log("cadastrar livros");
            cadastrarlivros(listaDeLivros);
            break;
        case 2:
            console.log("cadastrar usuarios");
            cadastrarUsuario(listaDeUsuarios);
            break;
        case 3:
            console.log("realizar emprestimos de livros");
            let usuario = prompt("digite o nome do usuario: ");
            let livro = prompt("digite o titulo do livro: ");
            realizarEmprestimos(listaDeEmprestimos, usuario, livro);
            break;
        case 4:
            console.log("registar devolução de livros");
            let usuarioRegistro = prompt("digite o nome do usuario: ");
            let livroRegistro = prompt("digite o titulo do livro: ");
            registrarDevolucao(listaDeEmprestimos, usuarioRegistro, livroRegistro);
            break;
        case 5:
            console.log("calcular multas por atraso na devolução");
            break;
        case 6:
            console.log("exibir relatorios ");
            break;
        default:
            console.log(listaDeLivros);
            console.log(listaDeUsuarios);
            console.log(listaDeEmprestimos);
            console.log("não existente");
            break;
    }
}

function cadastrarlivros(listaDeLivros) {
    let titulo = prompt("digite o titulo do livro: ");
    let autor = prompt("digite o autor do livro: ");

    let livro = {
        titulo: titulo,
        autor: autor,
        disponibilidade: true,
    };

    listaDeLivros.push(livro);
    console.log("livro cadastrado ");
}

function cadastrarUsuario(listaDeUsuario) {
    let nome = prompt("digite o nome: ");
    let email = prompt("digite o e-mail : ");
    let telefone = prompt("digite o telefone : ");

    let usuario = {
        nome: nome,
        email: email,
        telefone: telefone,
    };
    listaDeUsuario.push(usuario);
    console.log("usuario cadastrado ");
}

function buscarUmUsuario(listaDeUsuarios, nome) {
    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (listaDeUsuarios[i].nome.toLowerCase() === nome.toLowerCase()) {
            return i;
        }
    }
    console.log("Usuário não encontrado");

    return null;
}

function buscarUmLivro(listaDeLivros, titulo) {
    for (let i = 0; i < listaDeLivros.length; i++) {
        if (listaDeLivros[i].titulo.toLowerCase() === titulo.toLowerCase()) {
            return i;
        }
    }
    console.log("Livro não encontrado");

    return null;
}

function realizarEmprestimos(listaDeEmprestimos, usuario, livro) {
    let dataAtual = new Date();
    let dataDevolucaoStr = prompt(
        "Digite a data de devolução nesse formato (dd/mm/yyyy): "
    );

    let [dia, mes, ano] = dataDevolucaoStr.split("/");
    let dataDevolucao = new Date(`${ano}-${mes}-${dia}`);

    let diferenca = dataDevolucao - dataAtual;
    let diferencaEmDias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

    if (dataDevolucao < dataAtual || diferencaEmDias > 7) {
        console.log(
            "Data inválida. A data de devolução deve ser maior que a data atual e no máximo 7 dias após a data atual."
        );
    } else {
        let indiceUsuario = buscarUmUsuario(listaDeUsuarios, usuario);
        let indiceLivro = buscarUmLivro(listaDeLivros, livro);

        if (
            indiceUsuario !== null &&
            indiceLivro !== null &&
            listaDeLivros[indiceLivro].disponibilidade
        ) {
            let emprestimo = {
                usuario: listaDeUsuarios[indiceUsuario].nome,
                livro: listaDeLivros[indiceLivro].titulo,
                dataEmprestimo: dataAtual,
                dataDevolucao: dataDevolucao,
                status: "Em andamento",
                multa: 0,
            };
            listaDeLivros[indiceLivro].disponibilidade = false;

            listaDeEmprestimos.push(emprestimo);
            console.log("Empréstimo realizado com sucesso.");
        } else {
            console.log("Empréstimo não realizado.");
        }
    }
}

function registrarDevolucao(listaDeEmprestimos, usuario, livro) {
    for (let i = 0; i < listaDeEmprestimos.length; i++) {
        if (listaDeEmprestimos[i].usuario === usuario && listaDeEmprestimos[i].livro === livro && listaDeEmprestimos[i].status === "Em andamento") {
            
            let dataAtual = new Date();
            let dataDevolucao = listaDeEmprestimos[i].dataDevolucao;

            let diferenca = dataDevolucao - dataAtual;
            let diferencaEmDias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

            if (diferencaEmDias < 0) { 
                listaDeEmprestimos[i].multa = `R$ ${diferencaEmDias * 1},00`;
                listaDeEmprestimos[i].status = "Devolvido";
                console.log(`Devolução realizada com sucesso. Multa de R$ ${diferencaEmDias * 1},00 aplicada.`);
            } else {
                listaDeEmprestimos[i].status = "Devolvido";
                console.log("Devolução realizada com sucesso.");
            }
        } else {
            console.log("Devolução não realizada.");
        }
    }
}
