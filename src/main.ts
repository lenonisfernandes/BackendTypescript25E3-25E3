//CRUD      - READ
import { usuarios, UsuarioType } from './usuario';

const usuariosBD = retornaUsuarios();

console.log(usuariosBD);

const inteiro = '1';
const float = 1.4;

console.log(Number(inteiro) + float);

//hoisting
function retornaUsuarios () {
    return usuarios;
}

function retornarUsuarioPorId(id: number): UsuarioType | undefined {
    return usuarios.find(user => user.id === id);
}

console.log(retornarUsuarioPorId(123));

function mostrarEmTela() : void {
    console.log("exibindo em tela");
}
