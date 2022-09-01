import { Request, Response } from "express"
import Usuario from "../models/usuario";

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({ usuarios: usuarios });
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await Usuario.findByPk(id);

    if (user) {
        res.json(user);
    } else {
        res.json({
            msg: 'usuario no encontrado',
        });
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'ya existe un usuario con ese email'
            })
        }

        const usuario = new Usuario(body);
        await usuario.save();
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno consulte con el administrador',
        });
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const usuarioExiste = await Usuario.findByPk(id);
        if (!usuarioExiste) {
            return res.status(404).json({
                msg: "No existe ese usuario"
            })
        }

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'ya existe un usuario con ese email'
            })
        }

        await usuarioExiste.update(body);
        res.json(usuarioExiste);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno consulte con el administrador',
        });
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuarioExiste = await Usuario.findByPk(id);
        if (!usuarioExiste) {
            return res.status(404).json({
                msg: "No existe ese usuario"
            })
        }

       await usuarioExiste.destroy();
       res.json({
        msg:"registro eliminado con exito"
       })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error interno consulte con el administrador',
        });
    }
} 
