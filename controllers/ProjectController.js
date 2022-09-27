import ProjectModel from "../models/ProjectModel.js";

export const getAllProjects = async (req, res) => {
    try {
        const tasks = await ProjectModel.findAll();
        res.json(tasks)
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