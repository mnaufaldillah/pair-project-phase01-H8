'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category);
      Course.belongsToMany(models.User, {
        through: models.UsersCourse,
        foreignKey: `CourseId`
      });
      // Course.hasMany(models.UsersCourse, {
      //   foreignKey: `CourseId`
      // });
    }

    get durationInMinutes() {
      return `${this.duration} Menit`
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    numberOfLikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};