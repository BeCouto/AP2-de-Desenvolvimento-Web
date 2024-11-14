const url = "https://botafogo-atletas.mange.li/2024-1/";

// Função de login com verificação de senha hash e redirecionamento
const Login = () => {
    const senha = document.getElementById("senha").value;
    // Verificação de hash SHA-256 da senha
    if (hex_sha256(senha) === "ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1") {
        sessionStorage.setItem("logado", "sim"); // Armazena estado de login
        window.location.href = "detalhes.html"; // Redireciona para a página de detalhes
    } else {
        alert("Senha incorreta!"); // Exibe mensagem de erro
    }
};

// Associa a função de login ao botão
document.getElementById("botao").onclick = Login;

// Função de logout que limpa o estado de autenticação da sessionStorage
document.getElementById("logout").onclick = () => {
    sessionStorage.removeItem("logado"); // Remove o estado de login
    alert("Você saiu da sessão.");
};

// Função para buscar dados do JSON
const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

// Manipulação de clique para redirecionar e armazenar dados de atleta
const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`;

    // Armazenamento de cookies com path e SameSite
    document.cookie = `id=${id}; path=/; SameSite=Strict`;
    document.cookie = `altura=${e.currentTarget.dataset.altura}; path=/; SameSite=Strict`;

    // Armazenamento em localStorage e sessionStorage
    localStorage.setItem("id", id);
    localStorage.setItem("dados", JSON.stringify(e.currentTarget.dataset));
    sessionStorage.setItem("dados", JSON.stringify(e.currentTarget.dataset));

    window.location = url; // Redireciona para a página de detalhes
};

// Função para montar os cards dos atletas
const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");

    nome.innerHTML = atleta.nome;
    nome.style.fontFamily = 'sans-serif';
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    descri.innerHTML = atleta.detalhes;
    cartao.appendChild(descri);

    cartao.onclick = manipulaClick;

    // Dados adicionais nos atributos data
    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao;
};

// Carrega os atletas masculinos e os exibe no container
const container = document.getElementById("container");
pega_json(`${url}masculino`).then((atletas) => {
    atletas.forEach((atleta) => container.appendChild(montaCard(atleta)));
});

// Exemplo de requisição adicional
pega_json(`${url}26`).then((res) => console.log(res));

// Função auxiliar de verificação para o botão de autenticação (usando SHA-256)
const manipulaBotao = () => {
    const texto = document.getElementById("senha").value;
    if (hex_sha256(texto) === '8e618839cadb8df56f391402dfb10fe8273c20207a413c5034130be27bb63b7c') {
        sessionStorage.setItem("logado", "sim");
    } else {
        alert("Você errou a senha!");
    }
};

// Conecta a função de autenticação ao botão
document.getElementById("botao").onclick = manipulaBotao;
