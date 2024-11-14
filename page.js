// Seleciona elementos do DOM
const senhaInput = document.getElementById("senha");
const botao = document.getElementById("botao");
const logout = document.getElementById("logout");
const telaLogin = document.getElementById("tela-login");
const home = document.getElementById("home");
const dropdownContent = document.getElementById("dropdownContent");

// Função para mostrar ou esconder o dropdown
function toggleDropdown() {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

// Botão de logout
logout.addEventListener("click", function() {
    home.classList.remove("active");
    telaLogin.classList.add("active");
    senhaInput.value = ""; // Limpa a senha
});

// Fecha o dropdown quando clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('#dropdown-filtro button')) {
        dropdownContent.style.display = 'none';
    }
};

// Filtragem dos jogadores (exemplo)
document.getElementById("todos").addEventListener("click", function() {
    alert("Mostrando todos os jogadores.");
    dropdownContent.style.display = 'none';
});

document.getElementById("masculino").addEventListener("click", function() {
    alert("Mostrando jogadores masculinos.");
    dropdownContent.style.display = 'none';
});

document.getElementById("feminino").addEventListener("click", function() {
    alert("Mostrando jogadoras femininas.");
    dropdownContent.style.display = 'none';
});
