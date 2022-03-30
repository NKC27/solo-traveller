const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  // checking if the logged_in property on the session is set to false, if so, it redirects the user to the login page
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
