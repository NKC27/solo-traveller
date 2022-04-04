const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "companies",
        key: "id",
      },
    },
    trip_link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: true,
      },
    },
    img_src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {},
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: "trips",
  }
);

module.exports = Trip;
