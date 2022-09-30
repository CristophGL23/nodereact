import multer from "multer";
import FileModel from "../models/FileModel.js";
import mimeTypes from "mime-types";
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads')
    },
    filename: function(req,file,cb){
        // cb(null, Date.now + path.extname(file.originalname))
        cb("", Date.now() + file.fieldname + "." + mimeTypes.extension(file.mimetype))

    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
}).single('files')

export const getFiles = async (req, res) => {
    try {
        const files = await FileModel.findAll();
        res.json(files)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createFile = async (req, res) => {
    const URL = `http://localhost:8000/`
    try {
        await FileModel.create({
            userId: req.body.userId,
            taskId: req.body.taskId,
            files: URL + req.file.path,
        });
        res.json({
            message: 'Archivo agregado correctamente!!'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteFile = async (req, res) => {
    try {
        await FileModel.destroy({
            where:{id: req.params.id}
        });
        res.json({
            message: 'Archivo Eliminado correctamente!!'
        })
    } catch (error) {
        res.json({message: error.message})
    }
}