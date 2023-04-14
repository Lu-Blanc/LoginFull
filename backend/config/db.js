import {Sequelize} from 'sequelize';


const db = new Sequelize('login', 'postgres','admin',{
    host: 'localhost',
    dialect:'postgres'
})

export default db;