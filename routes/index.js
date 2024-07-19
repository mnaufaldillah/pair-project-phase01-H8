const Controller = require("../controllers/controller");
const router = require("express").Router();
const routerPortals = require(`./portals.js`);
const routerInstructors = require(`./instructors.js`);
const routerStudents = require(`./students.js`);
const routerCourses = require(`./courses.js`);
const routerProfiles = require(`./profiles.js`);

const isSignedIn = (req, res, next) => {
  if(!req.session.UserId) {
    const errors = `Please Sign In first`
    res.redirect(`/portals/signIn?errors=${errors}`);
  } else {
    next()
  }
}

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


router.get("/", Controller.renderHome);

//!Kita diskusikan macam" routes nya
router.use("/portals", routerPortals);
// router.get("/portals", Controller.renderPortal);

// Route untuk sign in
// router.get("/portals/signIn", Controller.renderLogin);

// router.post("/portals/signIn", Controller.handlerLogin);

// Route untuk sign up
// router.get("/portals/signUp", Controller.renderSignUp);

// router.post("/portals/signUp", Controller.handlerSignUp);

router.use(isSignedIn);

//Route untuk sign out
router.get(`/signOut`, Controller.handlerSignOut);

// router.use(isInstructor);

// Route untuk instructor & student dashboard
router.use(`/instructors`, routerInstructors);
// router.get("/instructors/dashboard", isInstructor, Controller.renderInstructorDashboard);
// router.post(`/instructors/courseAdd`, Controller.handlerAddCourse);

// router.post(`/instructors/courseEdit/:CourseId`, Controller.handlerEditCourse);
// router.post(`/instructors/profileEdit/:ProfileId`, Controller.handlerEditProfile);

// Route untuk student
router.use("/students", routerStudents);

// Route untuk courses dan profiles
router.use("/course", routerCourses);
router.use("/profile", routerProfiles);

// router.use((req, res, next) => {
//   console.log(req.session);
//   if(!req.session.UserId) {
//     const errors = `Please login first`
//     res.redirect(`/portals/login?errors=${errors}`);
//   } else {
//     next()
//   }
// })


module.exports = router;
