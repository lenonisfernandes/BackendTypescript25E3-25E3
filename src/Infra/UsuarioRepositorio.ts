import path from "path";
import fs from "fs";
import { DBSchema } from "./DBSchema";
import { usuarios, Usuario, UsuarioSchema } from "../usuario";

export default class UsuarioRepositorio {
    private caminhoArquivo: string;
    
    constructor(caminho: string = 'fakeBD.json') {
        this.caminhoArquivo = path.join(__dirname, caminho)
    }

    private accessBD() : DBSchema {
        const dbPuro = fs.readFileSync(this.caminhoArquivo, { encoding: 'utf-8' });
        return JSON.parse(dbPuro, (key, value) => {
            // Try to convert stringified bigints back to BigInt
            if (
                typeof value === 'string' &&
                key === 'saldo' &&
                /^\d+$/.test(value)
            ) {
                return BigInt(value);
            }
            return value;
        });
    }

    private reescreverBD(BDAtualizado: DBSchema): boolean {
        try {
            fs.writeFileSync(
                this.caminhoArquivo,
                JSON.stringify(BDAtualizado, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            );
            return true;
        } catch (error) {
            console.log(String(error));
            return false;
        }
    }

    public getUsuarios() {
        const db = this.accessBD();
        return db.users;
    }

    getUsuarioPorId(id: number): UsuarioSchema | undefined {
        return this.getUsuarios().find(user => user.id === id);
    }

    criarUsuario(usuario: Usuario): UsuarioSchema[] {
        const usuarios = this.getUsuarios()
        usuarios.push({...usuario});
        const DBAtualizado = this.accessBD();
        DBAtualizado.users = usuarios;
        this.reescreverBD(DBAtualizado);
        return usuarios;
    }
}

