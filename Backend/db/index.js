import { Sequelize } from 'sequelize';
import { createUserModel } from '../models/userModel.js';

const sequelize = new Sequelize('Student Mangment System', 'postgres', 'Nitesh@7877', {
  host: 'localhost',
  dialect: 'postgres',
  
});
let UserModel=null;
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    UserModel= await createUserModel(sequelize)
    await sequelize.sync({forse:true});
    console.log('Database is connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { connectDB, sequelize };
