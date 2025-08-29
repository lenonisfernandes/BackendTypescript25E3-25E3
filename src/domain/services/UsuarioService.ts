//CRUD      - READ
import UsuarioRepositorio from '../../Infra/UsuarioRepositorio';
import { UsuarioSchema, usuarios, Usuario } from '../../usuario';

const usuarioRepositorio = new UsuarioRepositorio();

//hoisting
function retornaUsuarios () {
    return usuarioRepositorio.getUsuarios();
}

function alterarUsuario(id: number, dadosAtualizacao: UsuarioSchema): UsuarioSchema | undefined {
    const indiceUsuario = usuarios.findIndex(user => user.id === id);

    if(indiceUsuario === -1) {
        console.log(`Usuário com ID ${id} não encontrado`);
        return;
    }

    usuarios[indiceUsuario] = {...usuarios[indiceUsuario], ...dadosAtualizacao};
    return usuarios[indiceUsuario];
}

function deleteUsuario(id: number): UsuarioSchema | undefined {
   
    const indiceUsuario = usuarios.findIndex(user => user.id === id);
    if(indiceUsuario === -1) {
        console.log('Usuário não encontrado');
        return;
    }

    const usuarioRemovido = usuarios.splice(indiceUsuario, 1)[0];
    return usuarioRemovido;
}