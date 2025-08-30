import routes from "./Api/Routes";
import UsuarioRepositorio from "./Infra/UsuarioRepositorio"
import { Usuario } from "./usuario";
import express, { Request, Response } from 'express';

const usuarioRespositorio = new UsuarioRepositorio;

const usuario = new Usuario("Rodney", true, 18n);

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json("Hello World!");
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});



