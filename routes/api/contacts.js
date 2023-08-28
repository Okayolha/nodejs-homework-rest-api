const express = require("express");

const router = express.Router();

const ctrlContact = require("../../controllers/contacts");

const isValidId = require("../../middlewares/isValidId");

const validateBody = require("../../middlewares/validateBody");

const authenticate = require("../../middlewares/authenticate");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrlContact.getAllContacts);

router.get("/:id", authenticate, isValidId, ctrlContact.getContactById);

router.post(
	"/",
	authenticate,
	validateBody(schemas.addSchema),
	ctrlContact.addContact
);

router.put(
	"/:id",
	authenticate,
	isValidId,
	validateBody(schemas.addSchema),
	ctrlContact.updateContactById
);

router.patch(
	"/:id/favorite",
	authenticate,
	isValidId,
	validateBody(schemas.updateFavoriteSchema),
	ctrlContact.updateFavorite
);

router.delete("/:id", authenticate, isValidId, ctrlContact.deleteContactById);

module.exports = router;
