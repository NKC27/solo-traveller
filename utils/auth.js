module.exports = {
  withAuth: (req, res, next) => {
    // TODO: Add a comment describing the functionality of this if statement
    // checking if the logged_in property on the session is set to false, if so, it redirects the user to the login page
    if (!req.session.logged_in) {
      res.redirect("/login");
    } else {
      next();
    }
  },
  isAdmin: (loggedInId, companyId) => {
    if (loggedInId == companyId) {
      return true;
    } else {
      return false;
    }
  },
  isGoing: (travellers, currentUserId) => {
    const idArr = travellers.map((traveller) => {
      return traveller.id;
    });

    return idArr.includes(currentUserId);
  },
};
