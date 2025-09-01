import NotFoundException from "../../Api/exceptions/NotFoundException";
import UsuarioRepositorio from "../../Infra/UsuarioRepositorio";
import { ViewUsuarioDTO } from "../../usuario";

export default class UsuarioService {
    private readonly usuarioRepositorio: UsuarioRepositorio;

    constructor(usuarioRepository: UsuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepository;
    }

    buscarUsuarioPorId(id: number): ViewUsuarioDTO | undefined {
        const usuario = this.usuarioRepositorio.getUsuarioPorId(+id);

        if(usuario) {
            const usuarioDTO: ViewUsuarioDTO = {
                id: usuario.id,
                nome: usuario.nome,
                ativo: usuario.ativo,
            };
            return usuarioDTO;
        }
        throw new NotFoundException('Usuário não encontrado.');
    }

}
