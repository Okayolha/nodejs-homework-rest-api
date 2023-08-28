const express = require("express");

const authenticate = require("../../middlewares/authenticate");

const validateBody = require("../../middlewares/validateBody");

const upload = require("../../middlewares/upload");

const ctrlUser = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
	"/users/register",
	validateBody(schemas.registerSchema),
	ctrlUser.register
);

router.post("/users/login", validateBody(schemas.loginSchema), ctrlUser.login);

router.get("/users/current", authenticate, ctrlUser.getCurrent);

router.post("/users/logout", authenticate, ctrlUser.logout);

router.patch("/users", authenticate, ctrlUser.updateSubscription);

router.patch(
	"/users/avatars",
	authenticate,
	upload.single("avatar"),
	ctrlUser.updateAvatar
);
router.get("/users/verify/:verificationToken", ctrlUser.verifyEmail);

router.post(
	"/users/verify",
	validateBody(schemas.emailShema),
	ctrlUser.resendVerifyEmail
);
module.exports = router;
