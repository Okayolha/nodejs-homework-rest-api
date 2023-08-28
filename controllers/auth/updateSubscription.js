const { User } = require("../../models/user");

const { ctrlWrapper, HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
	const { id } = req.user;

	const user = await User.findByIdAndUpdate(id, req.body, { new: true });
	if (!user) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(user);
};

module.exports = ctrlWrapper(updateSubscription);
