import UsuarioRepositorio from "./Infra/UsuarioRepositorio"
import { Usuario } from "./usuario";
import express, { Request, Response } from 'express';

const usuarioRespositorio = new UsuarioRepositorio;

const usuario = new Usuario("Rodney", true, 18n);

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.info(`Servidor rodando na porta http://localhost:${port}.`);
});

/*console.log("GetAll");
console.log(usuarioRespositorio.getUsuarios());

console.log("----");
console.log("GetById-123");
console.log(usuarioRespositorio.getUsuarioPorId(123));

console.log("----");
console.log("Create");
console.log(usuarioRespositorio.criarUsuario(usuario));*/


