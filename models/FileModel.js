import { DataTypes } from "sequelize";
import db from "../database/db.js";

const FileModel = db.define('files', {
    userId: { type: DataTypes.INTEGER },
    taskId: { type: DataTypes.INTEGER },
    files: { type: DataTypes.STRING }
})

export default FileModel