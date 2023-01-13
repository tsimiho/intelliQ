const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");
const AdminSchema = require("../models/admin");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const ad = AdminSchema.findOne({ usename: username });

  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  }

  res.status(200).json({ msg: "user created", token });
};

// const dashboard = async (req, res) => {
//     const luckyNumber = Math.floor(Math.random() * 100);

//     res.status(200).json({
//         msg: `Hello, ${req.user.username}`,
//         secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
//     });
// };

try {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = { name: req.body.name, password: hashedPassword };
  users.push(user);
  res.status(201).send();
} catch {
  res.status(500).send();
}
const user = users.find((user) => user.name === req.body.name);
if (user == null) {
  return res.status(400).send("Cannot find user");
}
try {
  if (await bcrypt.compare(req.body.password, user.password)) {
    res.send("Success");
  } else {
    res.send("Not Allowed");
  }
} catch {
  res.status(500).send();
}

module.exports = {
  login,
  // dashboard,
};
