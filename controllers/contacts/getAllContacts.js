const { Contact } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getAll = async (req, res, next) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20 } = req.query;
	const skip = (page - 1) * limit;
	const currentContacts = await Contact.find(
		{ owner },
		"-createdAt -updatedAt",
		{
			skip,
			limit,
		}
	).populate("owner", "name email");
	if (!currentContacts) {
		throw HttpError(404, "Request faild");
	}
	const filteredContacts = currentContacts.filter(
		(contact) => String(contact.favorite) === req.query?.favorite
	);
	res.json(filteredContacts.length > 0 ? filteredContacts : currentContacts);
};

module.exports = ctrlWrapper(getAll);
