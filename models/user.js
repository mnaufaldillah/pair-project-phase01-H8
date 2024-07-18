"use strict";
const { Model } = require("sequelize");
const bcrypt = require(`bcryptjs`);
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Course, {
        through: models.UsersCourse,
        foreignKey: `UserId`,
      });
      User.hasOne(models.Profile, {
        foreignKey: `UserId`
      });
    }
  }
  User.init(
    {
      email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: `The Email Address already in use`
        },
        validate: {
          notNull: {
            msg: `Email is Required`
          },
          notEmpty: {
            msg: `Email is Required`
          },
          isEmail: {
            msg: `Invalid Email Format`
          }
        }
      },
      password: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Password is Required`
          },
          notEmpty: {
            msg: `Password is Required`
          },
          len: {
            args: [8],
            msg: `Minimum Password Length is 8`
          }
        }
      },
      username: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Username is Required`
          },
          notEmpty: {
            msg: `Username is Required`
          },
          len: {
            args: [0, 20],
            msg: `Maximum Username Length is 20 So Don't make it too long.`
          }
        }
      },
      role: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Role is Required`
          },
          notEmpty: {
            msg: `Role is Required`
          }
        }
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, options) => {
    console.log(instance.password);
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(instance.password, salt);

    instance.password = hash;
  });

  User.afterCreate((instance, options) => {
    sequelize.models.Profile.create({
      UserId: instance.id
    });
  });

  return User;
};
