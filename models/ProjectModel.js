import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ProjectModel = db.define('tasks', {
    title_task: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER },
    status_task: { type: DataTypes.STRING },
    description_task: { type: DataTypes.STRING }
});

export default ProjectModel