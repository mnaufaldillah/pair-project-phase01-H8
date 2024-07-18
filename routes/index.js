const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", () => {});

//!Kita diskusikan macam" routes nya
router.get("/portals", (req, res) => {
  res.render("portal");
});

// Route untuk sign in
router.get("/portals/signIn", (req, res) => {
  res.render("sign-in");
});

router.post("/portals/signIn", (req, res) => {
  res.render("sign-in");
});

// Route untuk sign up
router.get("/portals/signUp", (req, res) => {
  res.render("sign-up");
});

router.post("/portals/signUp", (req, res) => {
  res.render("sign-up");
});

// Route untuk instructor & student dashboard
router.get("/instructors/dashboard", (req, res) => {
  res.render("instructor-dashboard");
});

router.get("/students/dashboard", (req, res) => {
  res.render("student-dashboard");
});

// Route untuk courses
router.get("/courses", (req, res) => {
  res.render("course");
});

module.exports = router;
