import { productServicesAPI } from "../services/product-services-API.js";

const produtoLocalStorage = JSON.parse(localStorage.getItem("produto"));
const formularioEditarProduto = document.querySelector('[data-edit-product]');

formularioEditarProduto.elements['url-imagem'].value = produtoLocalStorage.produtoURL;
formularioEditarProduto.elements['categoria'].value = produtoLocalStorage.produtoCategoria;
formularioEditarProduto.elements['nome-produto'].value = produtoLocalStorage.produtoNome;
formularioEditarProduto.elements['preco-produto'].value = produtoLocalStorage.produtoPreco;
formularioEditarProduto.elements['descricao-produto'].value = produtoLocalStorage.produtoDescricao;

async function editarProdutoForm(evento) {
    evento.preventDefault();

    const produto = {
        id: produtoLocalStorage.produtoId,
        urlImagem: formularioEditarProduto.elements['url-imagem'].value,
        categoria: formularioEditarProduto.elements['categoria'].value,
        nome: formularioEditarProduto.elements['nome-produto'].value,
        preco: formularioEditarProduto.elements['preco-produto'].value,
        codigo: produtoLocalStorage.produtoCodigo,
        descricao: formularioEditarProduto.elements['descricao-produto'].value
    }

    if (produto.urlImagem.length > 0 && produto.categoria.length > 0 && produto.nome.length > 0 && produto.preco.length > 0) {
        try {
            await productServicesAPI.editarProdutoAPI(produto);
            window.location.href = "../views/menu-administrador.html";
        } catch (error) {
            alert(error);
        }
    } else {
        alert("Os campos requeridos devem ser preenchidos")
    }
}

formularioEditarProduto.addEventListener("submit", editarProdutoForm);