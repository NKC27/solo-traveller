const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class TripUser extends Model {}

TripUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
        unique: false,
      },
    },
    trip_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "trip",
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "trip_user",
    underscored: true,
  }
);

module.exports = TripUser;
