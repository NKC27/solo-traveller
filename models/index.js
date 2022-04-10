const User = require("./User");
const Company = require("./Company");
const Trip = require("./Trip");
const TripUser = require("./TripUser");
const Post = require("./Post");
const Comment = require("./Comment");

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

Trip.hasMany(Post, {
  foreignKey: "trip_id",
  onDelete: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.belongsToMany(Trip, {
  through: {
    model: TripUser,
    unique: false,
  },
});

Post.belongsTo(Trip, {
  foreignKey: "trip_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, Trip, Company, TripUser, Post, Comment };
