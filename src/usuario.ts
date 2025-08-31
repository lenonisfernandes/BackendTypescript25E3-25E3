type contato = {
    telefone: string,
}

export class Usuario {
    id: number;
    nome: string;
    ativo: boolean = true;
    saldo?: bigint = 12n;
    numeroDoc?: number;
    senha?: string;
    sobrenome?: string;

    constructor(id: number, nome: string, ativo: boolean, saldo?: bigint, sobrenome?: string) {
        this.id = id;
        this.nome = nome;
        this.ativo = ativo;
        this.saldo = saldo;
        this.senha = "minha senha";
        this.sobrenome = sobrenome;
    }

}

// DRY - Dont repeat yourself

export class Professor extends Usuario {
    private tipo: string = 'Professor';
    private supervisor?: string;

    constructor(id: number, nome: string, ativo: boolean, saldo?: bigint, sobrenome?: string, supervisor?: string) {
        super(id, nome, ativo, saldo, sobrenome);
        this.supervisor = supervisor;
    }

    organizarAulas() {
        console.log(`Organizando aulas para o professor ${this.nome}`);
    }
}

export class Diretor extends Usuario {
    private tipo: string = 'Diretor';
    organizarAulas() {
        console.log(`Organizando aulas para o diretor ${this.nome}`);
    }
}

// DTO - Data Transfer Object

export type CriarUsuarioDTO = Omit<Usuario, 'id'>;

export type ViewUsuarioDTO = Pick<CriarUsuarioDTO, 'nome' | 'ativo' | 'numeroDoc'>;

export type AtualizarUsuarioDTO = Partial<CriarUsuarioDTO>;