import UsuarioRepositorio from '../Infra/UsuarioRepositorio';
import { Router, Request, Response } from 'express';
import { AtualizarUsuarioDTO, Professor, Usuario, ViewUsuarioDTO } from '../usuario';
import { CriarUsuarioDTO } from '../usuario';
import { UsuarioSchema } from '../Infra/UsuarioSchema';
import { body, validationResult, param } from 'express-validator';
import NotFoundException from './exceptions/NotFoundException';

class UsuarioController {
    private readonly usuarioRepositorio: UsuarioRepositorio;
    public router: Router = Router();

    constructor(usuarioRepositorio: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.routes();
    }

    public routes() {
        this.router.get('/', this.buscarUsuarios.bind(this));
        this.router.get('/:id', [
            param('id').notEmpty().isNumeric().withMessage('ID deve ser um número válido.')
        ], this.buscarUsuarioPorId.bind(this));
        this.router.post('/', [
            body('nome')
                .exists().withMessage('Nome é obrigatório.')
                .isString().withMessage('Nome deve ser uma string.'),
            body('ativo')
                .exists().withMessage('Ativo é obrigatório.')
                .isBoolean().withMessage('Ativo deve ser um booleano.'),
        ], this.criarUsuario.bind(this));
        this.router.delete('/:id', this.deletarUsuario.bind(this));
        this.router.patch('/:id', this.atualizarUsuarioPorId.bind(this));
    }

    public buscarUsuarios(req: Request, res: Response) {
        const usuarios: UsuarioSchema[] = this.usuarioRepositorio.getUsuarios();
        const usuariosDTO: ViewUsuarioDTO[] = usuarios.map(usuario => ({
            nome: usuario.nome,
            ativo: usuario.ativo,
            numeroDoc: usuario.numeroDoc,
        } as ViewUsuarioDTO));

        res.json(usuariosDTO);
    }

    public buscarUsuarioPorId(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
                throw new NotFoundException('Usuário não encontrado.');
            }
            
        } else {
            throw new NotFoundException('ID inválido.');
        }
    }

    public criarUsuario(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }

        const dadosUsuario: CriarUsuarioDTO = req.body;
        let usuarios = this.usuarioRepositorio.getUsuarios();
        const idExistentes = usuarios.map(usuario => usuario.id);
        const novoId = Math.max(...idExistentes) + 1;
        const usuario = new Usuario(
            novoId ?? '0',
            dadosUsuario.nome,
            dadosUsuario.ativo,
            dadosUsuario.saldo
        );
        this.usuarioRepositorio.criarUsuario(usuario);
        usuarios = this.usuarioRepositorio.getUsuarios();
        res.status(201).json(usuarios);
    }

    public deletarUsuario(req: Request, res: Response) {
        const id = req.params.id;
        if (id) {
            const sucesso = this.usuarioRepositorio.deletarUsuario(+id);
            if (sucesso) {
                res.status(204).send();
            } else {
                res.status(400).json({ error: "Usuário não encontrado." });
            }
        } else {
            res.status(400).json({ error: "ID inválido." });
        }
    }

    public atualizarUsuarioPorId(req: Request, res: Response) {
        const id = req.params.id;
        const dadosUsuario: AtualizarUsuarioDTO = req.body;

        if (id) {
            const usuario = this.usuarioRepositorio.atualizarUsuario(+id, dadosUsuario);
            if (usuario) {
                const usuarioDto: ViewUsuarioDTO & {id: number} = {
                    id: usuario.id,
                    nome: usuario.nome,
                    ativo: usuario.ativo,
                    numeroDoc: usuario.numeroDoc,
                };
                res.json(usuarioDto);
                return;
                }
            } 
        throw new NotFoundException('Usuário não encontrado.');
    }
}

export default UsuarioController;

