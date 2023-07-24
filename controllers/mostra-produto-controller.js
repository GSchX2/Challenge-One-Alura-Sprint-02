export default function mostrarItemProduto(produtoData) {
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