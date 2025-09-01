import UsuarioService from '../domain/services/UsuarioService';
import UsuarioRepositorio from '../Infra/UsuarioRepositorio';
import { UsuarioSchema } from '../Infra/UsuarioSchema';

jest.mock('../Infra/UsuarioRepositorio');
describe('UsuarioService', () => {

    let usuarioService: UsuarioService;
    let usuarioRepositorio: jest.Mocked<UsuarioRepositorio>;

    beforeEach(() => {
        usuarioRepositorio = new UsuarioRepositorio() as jest.Mocked<UsuarioRepositorio>;
        usuarioService = new UsuarioService(usuarioRepositorio);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('buscar todos', () => {
        it('deve retornar o usuário correspondente ao id fornecido', () => {
            usuarioRepositorio = new UsuarioRepositorio() as jest.Mocked<UsuarioRepositorio>;
            usuarioService = new UsuarioService(usuarioRepositorio);
            const mockUsuario: UsuarioSchema = { id: 1, nome: "Usuário falso", ativo: true};

            usuarioRepositorio.getUsuarioPorId.mockReturnValue(mockUsuario);

            const usuario = usuarioService.buscarUsuarioPorId(1);

            expect(usuarioRepositorio.getUsuarioPorId).toHaveBeenCalledWith(1);

            expect(usuario).toEqual(mockUsuario);
        });

        it('deve retornar um erro se o usuário não for encontrado', () => {
            usuarioRepositorio.getUsuarioPorId.mockReturnValue(undefined);

            expect(() => usuarioService.buscarUsuarioPorId(999)).toThrow('Usuário não encontrado.');
            expect(usuarioRepositorio.getUsuarioPorId).toHaveBeenCalledWith(999);
        });
    });

});