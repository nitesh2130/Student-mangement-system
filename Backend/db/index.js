import { Sequelize } from 'sequelize';
import { createUserModel } from '../models/userModel.js';
import { createStudentModel } from '../models/studentModel.js';
const sequelize = new Sequelize('Student Mangment System', 'postgres', 'Nitesh@7877', {
  host: 'localhost',
  dialect: 'postgres',
  
});
let UserModel=null;
let StudentModel = null;
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    UserModel= await createUserModel(sequelize);
    StudentModel = await createStudentModel(sequelize);
    await sequelize.sync({});
    console.log('Database is connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { connectDB, UserModel, StudentModel , sequelize };
