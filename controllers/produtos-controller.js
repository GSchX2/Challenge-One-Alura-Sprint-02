import { productServicesAPI } from "../services/product-services-API.js";

const listaProdutosEl = document.querySelector("[data-products]");
const mainProdutosEl = document.querySelector("main");
let listaProdutos = [];


function mostrarProduto(produtoData) {
    const produtoURL = produtoData.url;
    const produtoNome = produtoData.name;
    const produtoPreco = produtoData.price;
    const produtoCodigo = produtoData.code;
    // const produtoId = produtoData.id;
    // const produtoCategoria = produtoData.category;
    // const produtoDescricao = produtoData.description;

    const produtoEl = document.createElement('li');
    produtoEl.classList.add("produto__item");
    // produtoEl.dataset.productItem = "";

    produtoEl.innerHTML = `
        <div class="produto__wrapper-imagem">
            <img class="produto__imagem" src="${produtoURL}" alt="produto" width="176" height="174">
            <div class="produto__edicao">
                <button class="produto__botao-edicao" data-product-delete>
                    <svg class="produto__icone-edicao" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"/>
                    </svg>
                </button>
                <button class="produto__botao-edicao" data-product-edit>
                    <svg class="produto__icone-edicao" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"/>
                    </svg>
                </button>
            </div>
        </div>
        <p class="produto__nome">${produtoNome}</p>
        <p class="produto__preco">${produtoPreco}</p>
        <p class="produto__codigo">${produtoCodigo}</p>
        `;

    return produtoEl;
}

async function mostrarProdutos() {
    try {
        listaProdutos = await productServicesAPI.listaProdutosAPI();
        listaProdutos.forEach(produto => listaProdutosEl.appendChild(mostrarProduto(produto))); 
    } catch {
        mainProdutosEl.innerHTML = `<p class="error-message">Não foi possível carregar a lista de produtos<p>`;
    }
}

async function deletarProduto(botao, index, evento) {
    evento.preventDefault();

    const produtoId = listaProdutos[index].id;
    // const produtoEl = listaProdutosEl.children[index];
    const produtoEl = botao.parentElement.parentElement.parentElement;

    produtoEl.remove();

    listaProdutos.splice(index, 1, "Deletado");
    
    try {
        await productServicesAPI.deletarProdutoAPI(produtoId);
    } catch (error) {
        alert(error);
    }
}

function editarProduto(index, evento) {
    evento.preventDefault();

    const produto = {
        produtoId: listaProdutos[index].id,
        produtoURL: listaProdutos[index].url,
        produtoCategoria: listaProdutos[index].category,
        produtoNome: listaProdutos[index].name,
        produtoPreco: listaProdutos[index].price,
        produtoCodigo: listaProdutos[index].code,
        produtoDescricao: listaProdutos[index].description
    }

    localStorage.setItem("produto", JSON.stringify(produto));

    window.location.href = "../views/editar-produtos.html";
}


await mostrarProdutos();

const botaoDeletaEl = document.querySelectorAll("[data-product-delete]");
botaoDeletaEl.forEach((botao, index) => botao.addEventListener("click", (evento) => deletarProduto(botao, index, evento)));

const botaoEditaEl = document.querySelectorAll("[data-product-edit]");
botaoEditaEl.forEach((botao, index) => botao.addEventListener("click", (evento) => editarProduto(index, evento)));

 // function editar() {
    //     console.log("edita");
    //     const productCode = this.parentElement.parentElement.parentElement.querySelector('.');
    //     console.log(productCode)
    // }