// GET

async function listaProdutos() {
    const listaProdutosRequest = await fetch("http://localhost:3000/produtos");
    const listaProdutosResponse = await listaProdutosRequest.json();

    return listaProdutosResponse;    
}

// async function listaProdutosPorCategoria(categoria) {
//     const listaProdutosRequest = await fetch(`http://localhost:3000/produtos?category=${categoria}`);
//     const listaProdutosResponse = await listaProdutosRequest.json();

//     return listaProdutosResponse;    
// }

async function produto(id) {
    const produtoRequest = await fetch(`http://localhost:3000/produtos/${id}`);
    const produtoResponse = await produtoRequest.json();

    return produtoResponse;
}

async function buscarProduto(termoDeBusca) {
    const buscarRequest = await fetch(`http://localhost:3000/produtos?q=${termoDeBusca}`);
    const buscarResponse = await buscarRequest.json();

    return buscarResponse;
}


// POST

async function adicionarProduto(produto) {
    const adicionarProdutoRequest = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            url: produto.url,
            alt: produto.alt,
            categoria: produto.categoria,
            name: produto.name,
            price: produto.price,
            code: ("#" + (Math.floor(Math.random() * 100000))).padEnd(6, "0"),
            description: produto.description
        })
    });

    console.log(produto);

    if (!adicionarProdutoRequest.ok) {
        throw Error("Não foi possível adicionar o produto");
    } else {
        console.log(`Produto adicionado ${produto}`);
    }

    const adicionarProdutoResponse = await adicionarProdutoRequest.json();

    return adicionarProdutoResponse;
}

export const productServices = {
    listaProdutos,
    // listaProdutosPorCategoria,
    produto,
    buscarProduto,
    adicionarProduto
}