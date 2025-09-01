import { Request, Response, NextFunction } from "express";

const USUARIO = "admin";
const SENHA = "senhaSuperSecreta";

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401)
        .set('WWW-Authenticate', 'Basic realm="Protected Route"')
        .json({ error: "Acesso negado", message: "Credenciais de autorização são necessárias." });
        return;
    }

    if(!authHeader.startsWith('Basic ')) {
        res.status(401).json({
            error: "Formato de autenticação inválido",
            message: "Use Basic Auth"
        });
        return;
    }

    try {
        const base64Credentials = authHeader.split(" ")[1];
        if (!base64Credentials) {
            res.status(401).json({
                error: "Credenciais não fornecidas",
                message: "Cabeçalho de autenticação incompleto"
            });
            return;
        }
        const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
        const [username, password] = credentials.split(":");

        if (username === USUARIO && password === SENHA) {
            (req as Request & { user: { username: string } }).user = { username };
            next();
        } else {
            throw new Error('Credenciais inválidas');
            res.status(401).set('WWW-Authenticate', 'Basic realm="Protected Route"').json({
                error: "Credenciais inválidas",
                message: "O usuário ou a senha estão incorretos."
            });
        }
    } catch (error) {
        throw new Error('Credenciais inválidas');
        res.status(400).json({
            error: "Formato de credenciais inválido",
            message: "Não foi possível decodificar as credenciais."
        });
    }
}
