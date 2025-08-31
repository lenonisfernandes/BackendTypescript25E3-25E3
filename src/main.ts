import routes from "./Api/Routes";
import UsuarioRepositorio from "./Infra/UsuarioRepositorio"
import { Usuario } from "./usuario";
import express, { Request, Response } from 'express';
import logger from "./Infra/Logger";

const usuarioRespositorio = new UsuarioRepositorio;

const app = express();
const port = 3000;
app.use(express.json());

app.use(logger);
app.use('/api', routes);
app.get('/', (req: Request, res: Response) => {
    res.json("Hello World!");
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});



