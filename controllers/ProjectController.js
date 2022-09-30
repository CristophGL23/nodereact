import ProjectModel from "../models/ProjectModel.js";
import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";

export const getAllProjects = async (req, res) => {
    try {
        if (!req.body.search) {
            const tasks = await ProjectModel.findAll({
                include: UserModel,
            
            })
            res.json(tasks)
        } else {
            const tasks = await ProjectModel.findAll({
                include: UserModel,
                where: {
                    [Op.or]: {
                        title_task: {
                            [Op.substring]: req.body.search,
                        }, 
                        status_task: {
                            [Op.substring]: req.body.search,
                        }, 
                    }
                        
                }
            })  
            res.json(tasks)
        };
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getProject = async (req, res) => {
    try {
        const task = await ProjectModel.findAll({
            where: {
                id:req.params.id
            }
        });
        res.json(task[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createProject = async (req, res) => {
    try {
        await ProjectModel.create(req.body);
        res.json({
            message: 'Tarea agregada correctamente!!'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateProject = async (req, res) => {
    try {
        await ProjectModel.update(req.body, {
            where:{id: req.params.id}
        });
        res.json({
            message: 'Tarea actualizada correctamente!!'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteProject = async (req, res) => {
    try {
        await ProjectModel.destroy({
            where:{id: req.params.id}
        });
        res.json({
            message: 'Tarea eliminada correctamente!!'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const checkinProject = async (req, res) => {
    try {
        const tasks = await ProjectModel.findAll({
            include: UserModel,
            where: {
                checkin: {
                    [Op.eq]: 1
                }   
            }
        })
        res.json(tasks)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const checkUpdate = async (req, res) => {
    try {
        await ProjectModel.update({
            checkin: req.body.checkin
        }, {
            where:{id: req.params.id}
        });
        res.json({
            message: 'Consultaste la tarea!!'
        })
    } catch (error) {
        res.json({message: error.message})
        
    }
}