//CONTROLLERS ARE BASICALLLY THE FUNCTION OR SECOND ARGUMENT OF THE ROUTE
//CLEANER WAY IS PUTTING THEM IS SEPARATE FOLDERS
const User = require("../models/user");

//CREATING OR UPDATING A NEW USER
exports.createUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED=>", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    console.log("USER CREATED=>", newUser);
    res.json(newUser);
  }
};

//GETTING THE ACTIVE USER
exports.activeUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
