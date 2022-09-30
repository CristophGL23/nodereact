import { DataTypes } from "sequelize";
import db from "../database/db.js";

const CommentModal = db.define('comments', {
    userId: { type: DataTypes.INTEGER },
    taskId: { type: DataTypes.INTEGER },
    content: { type: DataTypes.TEXT }
})

export default CommentModal