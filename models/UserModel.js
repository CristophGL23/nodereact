import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UserModel = db.define('users', {
    name_complete: { type: DataTypes.STRING },
    user_name: { type: DataTypes.INTEGER },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    refresh_token: { type: DataTypes.TEXT },
    is_admin: { type: DataTypes.BOOLEAN },

});

export default UserModel