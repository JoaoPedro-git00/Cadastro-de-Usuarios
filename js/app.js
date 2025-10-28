// app.js
import { Usuario, ListaUsuarios } from './classes.js';
import { createListItem, clearInput } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://crudcrud.com/api/dadf13497f7948e8bfb98852ea8bf4ac/usuario";
    const cadastro = document.getElementById("listaCadastro");
    const inputDescricao = document.getElementById("nome");
    const btnCadastrar = document.getElementById("cadastrar");
    const listaUsuarios = new ListaUsuarios();

    // Função para deletar usuário
    const deletarUsuario = (id, li) => {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => {
                listaUsuarios.removeUsuario(id);
                li.remove();
            })
            .catch(err => console.error("Erro ao deletar:", err));
    };

    // Função para renderizar todos usuários
    const renderUsuarios = () => {
        cadastro.innerHTML = '';
        listaUsuarios.getAll().forEach(usuario => {
            const li = createListItem(usuario, deletarUsuario);
            cadastro.appendChild(li);
        });
    };

    // Buscar usuários da API
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const usuarios = data.map(u => new Usuario(u.descricao, u._id));
            listaUsuarios.setUsuarios(usuarios);
            renderUsuarios();
        })
        .catch(err => console.error("Erro ao buscar usuários:", err));

    // Adicionar novo usuário
    btnCadastrar.addEventListener("click", () => {
        const descricao = inputDescricao.value.trim();
        if (!descricao) return alert("Digite uma descrição válida!");

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descricao })
        })
        .then(res => res.json())
        .then(u => {
            const usuario = new Usuario(u.descricao, u._id);
            listaUsuarios.addUsuario(usuario);
            const li = createListItem(usuario, deletarUsuario);
            cadastro.appendChild(li);
            clearInput(inputDescricao);
        })
        .catch(err => console.error("Erro ao cadastrar usuário:", err));
    });
});

