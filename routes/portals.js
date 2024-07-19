const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.renderPortal);

// Route untuk sign in
router.get("/signIn", Controller.renderLogin);
router.post("/signIn", Controller.handlerLogin);

// Route untuk sign up
router.get("/signUp", Controller.renderSignUp);
router.post("/signUp", Controller.handlerSignUp);

module.exports = router;