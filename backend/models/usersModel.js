import {Sequelize} from 'sequelize'
import db from '../config/db.js'

const users = db.define ('users',{
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },email: {
        type: Sequelize.STRING,
        unique: true
    },
    refresh_token: {
        type: Sequelize.TEXT
    } 
},{
    freezeTableName: true
})

export default users;