import routes from "./Api/routes";
import UsuarioRepositorio from "./Infra/UsuarioRepositorio"
import express, { NextFunction, Request, Response } from 'express';
import Logger from "./Infra/Logger";
import { basicAuthMiddleware } from "./basicAuth";
import CustomError from "./Api/exceptions/CustomError";

const usuarioRespositorio = new UsuarioRepositorio;

const app = express();
const port = 3000;

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof CustomError) {
        res.status(error.getStatus()).json({
            error: error.message,
            status: error.getStatus()
        }); 
    }
    console.log(error.message);

    const message = 'Erro interno do servidor';
    const status = 500;
    res.status(status).json({
        error: message,
        status: status
    });
}

app.use(express.json());

app.use(Logger.init());
app.use(basicAuthMiddleware);
app.use('/api', routes);
app.get('/', (req: Request, res: Response) => {
    res.json("Hello World!");
});
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});



