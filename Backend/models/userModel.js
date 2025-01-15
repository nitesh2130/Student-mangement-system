import { DataTypes, STRING } from 'sequelize';
//import { sequelize } from '../db/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUserModel = async (sequelize) => {
  const User = sequelize.define('User',{
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      isLowerCase:true,
      unique:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    role:{
      type:DataTypes.STRING,
       allowNull:false
    },
  });

  // Hook to hash password before saving
  User.addHook('beforeSave', async (user) => {
    console.log(`thiiiiiiiiiiiiiiiii ${user.password}`);
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
      
    }
  });

  // check the password is right or not
  // User.prototype.isPasswordCorrect = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  // };


  // Instance method to generate access token
  // User.prototype.generateAccessToken = function () {
  //   return jwt.sign(
  //     {
  //       id: this.id,
  //       email: this.email,
  //       username: this.username,
  //       fullName: this.name,
  //     },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     {
  //       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  //     }
  //   );
  // };

  // Instance method to generate refresh token
  User.prototype.generateRefreshToken = function () {
    return jwt.sign(
      {
        id: this.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };

  
  return User;
};