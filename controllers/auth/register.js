const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email is use");
    }

    const avatarURL = gravatar.url(email);
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const compareHashedPassword = await bcrypt.compare(password, hashedPassword);

    console.log(compareHashedPassword);

    const newUser = await User.create({ ...req.body, password: hashedPassword, avatarUrl, });

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

module.exports = {
    register: ctrlWrapper(register),
};