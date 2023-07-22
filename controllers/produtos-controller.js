import { productServices } from "../services/product-services.js";

const listaProdutosEl = document.querySelector("[data-product]");
const mainProdutos = document.querySelector("main")

function mostrarProduto(produtoData) {
    const produtoURL = produtoData.url;
    const produtoNome = produtoData.name;
    const produtoPrice = produtoData.price;
    const produtoCodigo = produtoData.code;
    // const produtoId = produtoData.id;
    // const produtoCategoria = produtoData.category;
    // const produtoDescricao = produtoData.description;

    const produtoEl = document.createElement('li');
    produtoEl.classList.add("produto__item");

    produtoEl.innerHTML = `
        <img class="produto__imagem" src="${produtoURL}" width="176" height="174">
        <p class="produto__nome">${produtoNome}</p>
        <p class="produto__preco">${produtoPrice}</p>
        <p class="produto__codigo">${produtoCodigo}</p>
        `;

    return produtoEl;
}

async function mostrarProdutos() {
    try {
        const listaProdutosAPI = await productServices.listaProdutos();
        listaProdutosAPI.forEach(produto => listaProdutosEl.appendChild(mostrarProduto(produto)));
    } catch {
        mainProdutos.innerHTML = `<h2 class="produtos__titulo">Não foi possível carregar a lista de produtos<h2>`;
    }
}

mostrarProdutos();