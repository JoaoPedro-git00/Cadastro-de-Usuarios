// utils.js

export const createListItem = (usuario, onDelete) => {
    const li = document.createElement("li");
    li.innerHTML = `${usuario.descricao} <button class="delete">X</button>`;
    li.querySelector(".delete").addEventListener("click", () => onDelete(usuario.id, li));
    return li;
};

export const clearInput = (input) => input.value = '';
