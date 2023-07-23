// GET

async function listaProdutosAPI() {
    const listaProdutosRequest = await fetch("http://localhost:3000/produtos");
    const listaProdutosResponse = await listaProdutosRequest.json();

    return listaProdutosResponse;    
}

async function produtoAPI(id) {
    const produtoRequest = await fetch(`http://localhost:3000/produtos/${id}`);
    const produtoResponse = await produtoRequest.json();

    return produtoResponse;
}

async function pesquisarProdutoAPI(termoDeBusca) {
    const buscarRequest = await fetch(`http://localhost:3000/produtos?q=${termoDeBusca}`);
    const buscarResponse = await buscarRequest.json();

    if (buscarRequest.status === 404) {
        throw Error("Não foi possível efetuar a pesquisa");
    }

    return buscarResponse;
}


// POST

async function adicionarProdutoAPI(produto) {
    const adicionarProdutoRequest = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            url: produto.urlImagem,
            category: produto.categoria,
            name: produto.nome,
            price: produto.preco,
            code: ("#" + (Math.floor(Math.random() * 100000))).padEnd(6, "0"),
            description: produto.descricao
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

export const productServicesAPI = {
    listaProdutosAPI,
    produtoAPI,
    pesquisarProdutoAPI,
    adicionarProdutoAPI
}