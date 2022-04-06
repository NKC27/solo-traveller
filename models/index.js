const User = require("./User");
const Company = require("./Company");
const Trip = require("./Trip");
const TripUser = require("./TripUser");

Company.hasMany(Trip, {
  foreignKey: "company_id",
  onDelete: "CASCADE",
});

Trip.belongsTo(Company, {
  foreignKey: "company_id",
  onDelete: "CASCADE",
});

Trip.belongsToMany(User, {
  through: {
    model: TripUser,
    unique: false,
  },
});

User.belongsToMany(Trip, {
  through: {
    model: TripUser,
    unique: false,
  },
});

module.exports = { User, Trip, Company, TripUser };
