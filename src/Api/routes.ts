import { Router } from "express";
import UsuarioController from "./UsuarioController";
import UsuarioRepositorio from "../Infra/UsuarioRepositorio";

const routes = Router();

const usuarioRepositorio = new UsuarioRepositorio();
const usuarioController = new UsuarioController(usuarioRepositorio);

routes.use('/usuarios', usuarioController.router);

export default routes;