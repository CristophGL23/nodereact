import UserModel from "../models/UserModel.js";
import bcript from "bcrypt";
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
    
        res.json(users)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findAll({
            where: {
                id:req.params.id
            }
        });
        res.json(user[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    try {
        const salt = await bcript.genSalt(10);
        let usr = {
            name_complete: req.body.name_complete,
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password
        }
        await UserModel.create(usr);
        res.json({
            message: 'Usuario agregado correctamente!!'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        await UserModel.update(req.body, {
            where:{id: req.params.id}
        });
        res.json({
            message: 'Usuario actualizado correctamente!!'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        await UserModel.destroy({
            where:{id: req.params.id}
        });
        res.json({
            message: 'Usuario eliminado correctamente!!'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}