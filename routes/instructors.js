const Controller = require("../controllers/controller");
const router = require("express").Router();
const routerCourses = require(`./courses.js`);
const routerProfiles = require(`./profiles.js`);

const isInstructor = (req, res, next) => {
    // console.log(req.session);
    if(req.session.role === `Instructor`) {
      next();
    } else {
      if (!req.headerSent && req.originalUrl !== `//students/dashboard`) {
        res.redirect(`/students/dashboard`);
      } else {
        next()
      }
    }
  }

// Route untuk instructor
router.get("/dashboard", isInstructor, Controller.renderInstructorDashboard);
// router.use(`/course`, routerCourses);

// router.use(`/profile`, routerProfiles);

module.exports = router;