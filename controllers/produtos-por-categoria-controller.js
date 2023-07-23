import { productServicesAPI } from "../services/product-services-API.js";

const listaProdutosPorCategoriaEl = document.querySelector("[data-catagory-product]");

function mostrarCategoria(categoria) {
    const produtosCategoriaEl = document.createElement('div');
    produtosCategoriaEl.classList.add("produtos__wrapper");

    produtosCategoriaEl.innerHTML = `
        <div class="produtos__categoria">
            <h2 class="produtos__categoria-titulo">${categoria}</h2>
            <a href="#" class="produtos__categoria-link">Ver tudo
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
            <ul class="produtos__lista-produtos" data-category>
            </ul>
        </nav>
        `;

        return produtosCategoriaEl;
}

export default function mostrarProdutoDaCategoria(produtoData) {
    const produtoURL = produtoData.url;
    const produtoNome = produtoData.name;
    const produtoPrice = produtoData.price;
    // const produtoCodigo = produtoData.code;
    // const produtoId = produtoData.id;
    // const produtoCategoria = produtoData.category;
    // const produtoDescricao = produtoData.description;

    const produtoEl = document.createElement('li');
    produtoEl.classList.add("produto__item");

    produtoEl.innerHTML = `
        <img class="produto__imagem" src="${produtoURL}" alt="produto" width="176" height="174">
        <p class="produto__nome">${produtoNome}</p>
        <p class="produto__preco">${produtoPrice}</p>
        <a href="#" class="produto__link">Ver Produto</a>
        `;

    return produtoEl;
}

function configExibicaoDeProdutos(listaDeProdutosDaCategoriaEl) {
    const produtosDaCategoriaEL = listaDeProdutosDaCategoriaEl.childNodes;
   
    produtosDaCategoriaEL.forEach((produto, indexCategoria) => {

        if (indexCategoria > 4) {
            produto.classList.add("produto__item--large-view");
        }
    });
}

function mostrarProdutosDasCategorias(categoria) {
    listaProdutosPorCategoriaEl.appendChild(mostrarCategoria(categoria));

    const listaDeProdutosDasCategoriasEl = document.querySelectorAll('[data-category]');
    const indexCategoria = listaDeProdutosDasCategoriasEl.length - 1;
    const produtosDaCategoria = this.filter(produto => produto.category === categoria);
    const produtosDaCategoriaParaMostrar = produtosDaCategoria.slice(0, 6);

    produtosDaCategoriaParaMostrar.forEach(produto => {
            listaDeProdutosDasCategoriasEl[indexCategoria].appendChild(mostrarProdutoDaCategoria(produto));
        });
    
    configExibicaoDeProdutos(listaDeProdutosDasCategoriasEl[indexCategoria])
   
}

async function mostrarProdutosPorCategoria() {
    try {
        const listaProdutosPorCategoria = await productServicesAPI.listaProdutosAPI();
        const categorias = [...new Set(listaProdutosPorCategoria.map(produto => produto.category))];

        categorias.forEach(mostrarProdutosDasCategorias, listaProdutosPorCategoria);
    } catch {
        listaProdutosPorCategoriaEl.innerHTML = `<h2 class="produtos__categoria-titulo">Não foi possível carregar a lista de produtos<h2>`;
    }
}

mostrarProdutosPorCategoria();
