import { productServicesAPI } from "../services/product-services-API.js";

const formularioAddProduto = document.querySelector('[data-add-produto]');

async function addProduto(evento) {
    evento.preventDefault();

    const produto = {
        urlImagem: formularioAddProduto.elements['url-imagem'].value,
        categoria: formularioAddProduto.elements['categoria'].value,
        nome: formularioAddProduto.elements['nome-produto'].value,
        preco: formularioAddProduto.elements['preco-produto'].value,
        descricao: formularioAddProduto.elements['descricao-produto'].value,
    }

    if (produto.urlImagem.length > 0 && produto.categoria.length > 0 && produto.nome.length > 0 && produto.preco.length > 0) {
        try {
            await productServicesAPI.adicionarProdutoAPI(produto);
            window.location.href = "../views/menu-administrador.html";
        } catch (error) {
            alert(error);
        }
    } else {
        alert("Os campos requeridos devem ser preenchidos")
    }   
}

formularioAddProduto.addEventListener("submit", addProduto);