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
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Course Name is Required`
        },
        notEmpty: {
          msg: `Course Name is Required`
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Course Description is Required`
        },
        notEmpty: {
          msg: `Course Description is Required`
        }
      }
    },
    content: DataTypes.STRING,
    duration: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Course Duration is Required`
        },
        notEmpty: {
          msg: `Course Duration is Required`
        }
      }
    },
    numberOfLikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });

  Course.beforeCreate((instance) => {
    instance.numberOfLikes = 0;
  });

  return Course;
};