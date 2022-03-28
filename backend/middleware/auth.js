const admin = require("../firebase");
const User = require("../models/user");

//VERIFY IF THE USER IS LOGGED IN
exports.authCheck = async (req, res, next) => {
  //console.log(req.headers);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    //console.log("FIREBASE USER CHECK==>", firebaseUser);
    req.user = firebaseUser;
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: "Invalid token",
    });
  }
  next();
};

//VERIFY IF THE USER IS ADMIN
exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "You need to be admin to acces this page",
    });
  } else {
    next();
  }
};
