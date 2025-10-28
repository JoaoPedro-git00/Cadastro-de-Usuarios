
// classes.js
export class Usuario {
    constructor(descricao, id = null) {
        this.descricao = descricao;
        this.id = id;
    }
}

export class ListaUsuarios {
    constructor() {
        this.usuarios = [];
    }

    setUsuarios(usuarios) {
        this.usuarios = usuarios;
    }

    addUsuario(usuario) {
        this.usuarios.push(usuario);
    }

    removeUsuario(id) {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
    }

    getAll() {
        return this.usuarios;
    }
}

