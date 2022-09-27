import { Sequelize } from "sequelize";

const db = new Sequelize('winba', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db