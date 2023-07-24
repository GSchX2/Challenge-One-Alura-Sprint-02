import { productServicesAPI } from "../services/product-services-API.js";
import mostrarProdutosPesquisa from "../controllers/mostra-produto-controller.js"

const pesquisaEl = document.querySelectorAll('[data-form-pesquisa]');
const mostrarResultadoPesquisaEl = document.querySelector("main");

async function pesquisaProduto(evento) {
    evento.preventDefault();

    let inputPesquisaEl = evento.target.elements["pesquisa-produto"].value;
    
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
            mostrarResultadoPesquisaEl.innerHTML = `<p class="error-message">Nenhum produto foi encontrado<p>`;
        }
    } catch (error) {
        mostrarResultadoPesquisaEl.innerHTML = `<p class="error-message">${error}<p>`;
    }

    evento.target.elements["pesquisa-produto"].value = "";
}

pesquisaEl.forEach(pesquisaEl => pesquisaEl.addEventListener("submit", pesquisaProduto));
