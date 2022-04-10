const sequelize = require("../config/connection");
const { User, Trip, Company, Post, Comment } = require("../models");
const { bulkCreate } = require("../models/User");
const tripData = require("./tripData.json");
const userData = require("./userData.json");
const companyData = require("./companyData.json");
const tripUserData = require("./tripUserData.json");
const TripUser = require("../models/TripUser");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Company.bulkCreate(companyData, {
    individualHooks: true,
    returning: true,
  });

  await Trip.bulkCreate(tripData, {
    individualHooks: true,
    returning: true,
  });

  await TripUser.bulkCreate(tripUserData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
};

seedDatabase();
