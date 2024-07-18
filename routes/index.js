const Controller = require("../controllers/controller");
const router = require("express").Router();
const routerPortals = require(`./portals.js`);

const isSignedIn = (req, res, next) => {
  console.log(req.session);
  if(!req.session.UserId) {
    const errors = `Please Sign In first`
    res.redirect(`/portals/signIn?errors=${errors}`);
  } else {
    next()
  }
}

const isInstructor = (req, res, next) => {
  console.log(req.session);
  if(req.session.role === `Instructor`) {
    next();
  } else {
    res.redirect(`/students/dashboard`)
  }
}


router.get("/", Controller.renderHome);

//!Kita diskusikan macam" routes nya
// router.use("/portals", routerPortals);
router.get("/portals", Controller.renderPortal);

// Route untuk sign in
router.get("/portals/signIn", Controller.renderLogin);

router.post("/portals/signIn", Controller.handlerLogin);

// Route untuk sign up
router.get("/portals/signUp", Controller.renderSignUp);

router.post("/portals/signUp", Controller.handlerSignUp);

router.use(isSignedIn);

//Route untuk sign out
router.get(`/signOut`, Controller.handlerSignOut);

router.use(isInstructor);

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
