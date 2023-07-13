const showPesquisa = document.querySelector('.cabecalho__botao-mostra-pesquisa');
const pesquisa = document.querySelector('.cabecalho__pesquisa--pequena-view-esconder');

showPesquisa.addEventListener("click", () => {
    pesquisa.classList.toggle("cabecalho__pesquisa--pequena-view-esconder");
    pesquisa.classList.toggle("cabecalho__pesquisa--pequena-view-mostrar");
});