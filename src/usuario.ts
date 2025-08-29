export const usuarios: UsuarioSchema[] = [
    {
        id: 123,
        nome: 'Lenon',
        ativo: false,
        saldo: 215181316811n,
    },
    {
        id: 124,
        nome: 'Isabela',
        ativo: true
    },
]

export type UsuarioSchema = {
    id: number,
    nome: string,
    ativo: boolean,
    saldo?: bigint,
    contato?: {[key: string]: unknown},
}

type contato = {
    telefone: string,
}

export class Usuario {
    id: number;
    nome: string;
    ativo: boolean = true;
    saldo?: bigint = 12n;

    constructor(nome: string, ativo: boolean, saldo?: bigint) {
        this.id = Math.floor(Math.random() * 100);
        this.nome = nome;
        this.ativo = ativo;
        this.saldo = saldo;
    }

    getNome() {
        return this.nome;
    }

    toString() {
        return `ID: ${this.id} - Nome: ${this.nome} - Ativo: ${this.ativo} - Saldo: ${this.saldo}`;
    }
}