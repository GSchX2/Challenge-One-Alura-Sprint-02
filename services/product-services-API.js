// GET

async function listaProdutosAPI() {
    const listaProdutosRequest = await fetch("https://64cd4d0abb31a268409a9101.mockapi.io/API/produtos");
    const listaProdutosResponse = await listaProdutosRequest.json();

    return listaProdutosResponse;    
}

async function pesquisarProdutoAPI(termoDeBusca) {
    const pesquisarRequest = await fetch(`https://64cd4d0abb31a268409a9101.mockapi.io/API/produtos?q=${termoDeBusca}`);
    const pesquisarResponse = await pesquisarRequest.json();

    if (pesquisarRequest.status === 404) {
        throw Error("Não foi possível efetuar a pesquisa");
    }

    return pesquisarResponse;
}


// POST

async function adicionarProdutoAPI(produto) {
    const adicionarProdutoRequest = await fetch("https://64cd4d0abb31a268409a9101.mockapi.io/API/produtos", {
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

    if (!adicionarProdutoRequest.ok) {
        throw Error("Não foi possível adicionar o produto");
    } else {
        console.log("Produto adicionado");
        console.log(produto);
    }

    const adicionarProdutoResponse = await adicionarProdutoRequest.json();

    return adicionarProdutoResponse;
}


// PUT

async function editarProdutoAPI(produto) {
    const produtoId = produto.id;
    const editarRequest = await fetch(`https://64cd4d0abb31a268409a9101.mockapi.io/API/produtos/${produtoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: produto.urlImagem,
            category: produto.categoria,
            name: produto.nome,
            price: produto.preco,
            code: produto.codigo,
            description: produto.descricao
        })
    });

    if (!editarRequest) {
        throw Error("Não foi possível editar o produto");
    } else {
        console.log("Produto editado");
        console.log(produto);
    }

    const editarResponse = await editarRequest.json();

    return editarResponse;
}


// DELETE

async function deletarProdutoAPI(produtoId) {
    const deletarRequest = await fetch(`https://64cd4d0abb31a268409a9101.mockapi.io/API/produtos/${produtoId}`, {
        method: "DELETE"
    });
    
    if (!deletarRequest.ok) {
        throw Error("Não foi possível deletar o produto");
    } else {
        console.log("item deletado");
    }
}

export const productServicesAPI = {
    listaProdutosAPI,
    pesquisarProdutoAPI,
    adicionarProdutoAPI,
    editarProdutoAPI,
    deletarProdutoAPI
}