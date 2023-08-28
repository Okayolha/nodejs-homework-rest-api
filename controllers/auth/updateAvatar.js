const fs = require("fs/promises");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const path = require("path");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;
	const filename = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarsDir, filename);

	const image = await Jimp.read(tempUpload);
	await image.resize(250, 250).write(tempUpload);

	await fs.rename(tempUpload, resultUpload);
	const avatarURL = path.join("avatars", filename);
	await User.findByIdAndUpdate(_id, { avatarURL });

	res.json({
		avatarURL,
	});
};
module.exports = ctrlWrapper(updateAvatar);
