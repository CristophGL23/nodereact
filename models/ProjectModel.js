import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";

const ProjectModel = db.define('tasks', {
    title_task: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    status_task: { type: DataTypes.STRING },
    description_task: { type: DataTypes.STRING }
});

ProjectModel.belongsTo(UserModel)

export default ProjectModel