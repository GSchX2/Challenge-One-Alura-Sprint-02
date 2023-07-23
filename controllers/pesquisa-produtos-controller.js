import { productServicesAPI } from "../services/product-services-API.js";
import mostrarProdutosPesquisa from "../controllers/produtos-por-categoria-controller.js"

const pesquisaEl = document.querySelector('[data-form-pesquisa]');
const mostrarResultadoPesquisaEl = document.querySelector("main");

async function pesquisaProduto(evento) {
    evento.preventDefault()

    const inputPesquisaEl = pesquisaEl.elements["pesquisa-produto"].value;

    while(mostrarResultadoPesquisaEl.firstChild) {
        mostrarResultadoPesquisaEl.firstChild.remove();
    }

    const navProdutos = document.createElement('nav')
    const produtosListaEl = document.createElement('ul');
    
    mostrarResultadoPesquisaEl.appendChild(navProdutos);
    navProdutos.appendChild(produtosListaEl);
    mostrarResultadoPesquisaEl.classList.add("produtos");
    mostrarResultadoPesquisaEl.classList.add("container");
    produtosListaEl.classList.add("produtos__lista-produtos");


    try {
        const resultadoPesquisa = await productServicesAPI.pesquisarProdutoAPI(inputPesquisaEl);
    
        if (resultadoPesquisa.length) {
            resultadoPesquisa.forEach(
                produto => produtosListaEl.appendChild(mostrarProdutosPesquisa(produto)));
        } else {
            mostrarResultadoPesquisaEl.innerHTML = `<h2 class="produtos__titulo">Nenhum produto foi encontrado<h2>`;
        }
    } catch (error) {
        mostrarResultadoPesquisaEl.innerHTML = `<h2 class="produtos__titulo">${error}<h2>`;
    }

}

pesquisaEl.addEventListener("submit", pesquisaProduto);
