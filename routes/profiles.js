const Controller = require("../controllers/controller");
const router = require("express").Router();

router.post(`/edit/:ProfileId`, Controller.handlerEditProfile);

module.exports = router;