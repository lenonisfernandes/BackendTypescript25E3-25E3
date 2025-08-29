import { UsuarioSchema } from "../usuario";

export type DBSchema = {
    users: UsuarioSchema[];
}