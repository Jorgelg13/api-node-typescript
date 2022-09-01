import {Sequelize} from 'sequelize';

const db = new Sequelize('api_rest_node','root','admin',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default db;
