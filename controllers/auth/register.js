const { User } = require("../../models/user");
const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);
	const verificationToken = nanoid();

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});
	const verifyEmail = {
		to: email,
		subject: "verify email",
		html: `<h3>Thank you for registering!</h3><p>Please click on
    <a href="http://localhost:${process.env.PORT}/api/auth/verify
    /${verificationToken}">this link</a></p>`,
	};
	await sendEmail(verifyEmail);

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: "starter",
		},
	});
};

module.exports = ctrlWrapper(register);
