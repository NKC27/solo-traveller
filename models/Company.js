const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Company extends Model {
  // Function to check password when user signs in
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // hashing password when company signs up
      beforeCreate: async (newCompanyData) => {
        newCompanyData.password = await bcrypt.hash(
          newCompanyData.password,
          10
        );
        return newCompanyData;
      },
      beforeUpdate: async (updatedCompanyData) => {
        updatedCompanyData.password = await bcrypt.hash(
          updatedCompanyData.password,
          10
        );
        return updatedCompanyData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: "companies",
  }
);

module.exports = Company;
