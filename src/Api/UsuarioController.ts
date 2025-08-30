import UsuarioRepositorio from '../Infra/UsuarioRepositorio';
import { Router, Request, Response } from 'express';
import { Usuario, ViewUsuarioDTO } from '../usuario';
import { CriarUsuarioDTO } from '../usuario';

class UsuarioController {
    private readonly usuarioRepositorio: UsuarioRepositorio;
    public router: Router = Router();

    constructor(usuarioRepositorio: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.routes();
    }

    public routes() {
        this.router.get('/', this.buscarUsuarios.bind(this));
        this.router.get('/:id', this.buscarUsuarioPorId.bind(this));
        this.router.post('/', this.criarUsuario.bind(this));
    }

    public buscarUsuarios(req: Request, res: Response) {
        res.json(this.usuarioRepositorio.getUsuarios());
    }

    public buscarUsuarioPorId(req: Request, res: Response) {
        const id = req.params.id;
        if(id) {
            const usuario = this.usuarioRepositorio.getUsuarioPorId(+id);

            if(usuario) {
                const usuarioDTO: ViewUsuarioDTO = {
                    nome: usuario.nome,
                    ativo: usuario.ativo,
                    numeroDoc: usuario.numeroDoc
                };
                res.json(usuarioDTO);
            } else {
                res.status(400).json({ error: "Usuário não encontrado." });
            }
            
        } else {
            res.status(400).json({ error: "ID inválido." });
        }  
    }

    public criarUsuario(req: Request, res: Response) {
        const dadosUsuario: CriarUsuarioDTO = req.body;
        const usuario = new Usuario(
            dadosUsuario.nome,
            dadosUsuario.ativo,
            dadosUsuario.saldo
        );
        this.usuarioRepositorio.criarUsuario(usuario);
        const usuarios = this.usuarioRepositorio.getUsuarios();
        res.json(usuarios);
    }
}

export default UsuarioController;



// app.get('/usuarios', (req: Request, res: Response) => {
//     res.json(usuarioRespositorio.getUsuarios());
// });

// app.get('/usuarios/:id', (req: Request, res: Response) => {
//     const id = req.params.id;
//     if(id) {
//         res.json(usuarioRespositorio.getUsuarioPorId(+id));
//     } else {
//         res.status(400).json({ error: "ID inválido." });
//     }
// });

