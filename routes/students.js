const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/dashboard", Controller.renderStudentDashboard);

module.exports = router