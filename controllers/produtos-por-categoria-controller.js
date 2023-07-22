import { productServices } from "../services/product-services.js";

const listaProdutosPorCategoriaEl = document.querySelector("[data-catagory-product]");

function mostrarProduto(produtoData, index) {
    const produtoURL = produtoData.url;
    const produtoNome = produtoData.name;
    const produtoPrice = produtoData.price;
    // const produtoCodigo = produtoData.code;
    // const produtoId = produtoData.id;
    // const produtoCategoria = produtoData.category;
    // const produtoDescricao = produtoData.description;

    const produtoEl = document.createElement('li');
    produtoEl.classList.add("produto__item");

    if (index > 3) {
        produtoEl.classList.add("produto__item--large-view");
    }

    produtoEl.innerHTML = `
        <img class="produto__imagem" src="${produtoURL}" width="176" height="174">
        <p class="produto__nome">${produtoNome}</p>
        <p class="produto__preco">${produtoPrice}</p>
        <a href="#" class="produto__link">Ver Produto</a>
        `;

    return produtoEl;
}

function criaProdutosCategoria(categoria) {
    const categoriaDataAttribute = categoria.replace(/[^a-zA-Z0-9]/g, "");
    const produtosCategoria = document.createElement('div');
    produtosCategoria.classList.add("produtos__wrapper");

    produtosCategoria.innerHTML = `
        <div class="produtos__categoria">
            <h2 class="produtos__categoria-titulo">${categoria}</h2>
            <a href="produtos.html" class="produtos__categoria-link">Ver tudo
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_166_2677)">
                    <path d="M2.66634 8.66665L10.7797 8.66665L7.05301 12.3933L7.99967 13.3333L13.333 7.99998L7.99968 2.66665L7.05968 3.60665L10.7797 7.33331L2.66634 7.33331L2.66634 8.66665Z" fill="#2A7AE4"/>
                </g>
                <defs>
                    <clipPath id="clip0_166_2677">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
            </a>
        </div>
        <nav>
            <ul class="produtos__lista-produtos" data-category-${categoriaDataAttribute}>
            </ul>
        </nav>
        `;

    listaProdutosPorCategoriaEl.appendChild(produtosCategoria);

    const produtosLista = document.querySelector(`[data-category-${categoriaDataAttribute}]`)
    const produtosDaCategoria = this.filter(produtoLista => produtoLista.category === categoria);

    produtosDaCategoria.forEach((produto, index) => produtosLista.appendChild(mostrarProduto(produto, index)));
}

async function mostrarProdutosPorCategoria() {
    try {
        const listaProdutosPorCategoriaAPI = await productServices.listaProdutos();
        const categorias = [...new Set(listaProdutosPorCategoriaAPI.map(produto => produto.category))];

        categorias.forEach(criaProdutosCategoria, listaProdutosPorCategoriaAPI);
    } catch {
        listaProdutosPorCategoriaEl.innerHTML = `<h2 class="produtos__categoria-titulo">Não foi possível carregar a lista de produtos<h2>`;
    }
}

mostrarProdutosPorCategoria();
