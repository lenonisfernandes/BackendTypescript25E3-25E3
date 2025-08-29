export const usuarios: UsuarioType[] = [
    {
        id: 123,
        nome: 'Lenon',
        ativo: false,
        saldo: 215181316811n,
    },
    {
        id: 124,
        nome: 'Isabela',
    },
]

export type UsuarioType = {
    id: number,
    nome: string,
    ativo?: boolean,
    saldo?: bigint
}