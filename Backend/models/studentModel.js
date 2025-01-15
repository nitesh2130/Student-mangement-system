import { DataTypes } from 'sequelize';

export const createStudentModel = async (sequelize) => {
  const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 8
      },
    },
    photo: {
      type: DataTypes.STRING, // Path or URL to the uploaded photo.
      allowNull: true,
    },
  });

  // Add hooks or methods if needed
  return Student;
};
