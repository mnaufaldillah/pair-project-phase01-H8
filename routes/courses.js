const Controller = require("../controllers/controller");
const router = require("express").Router();
const { Course, sequelize } = require(`../models/index.js`);

const attachReqToModel = (req, res, next) => {
    sequelize.addHook(`beforeCreate`, (instance) => {
        instance.req = req;
    });
    next();
  }

router.post(`/add`, attachReqToModel, Controller.handlerAddCourse);
router.get(`/detail/:CourseId`, Controller.renderCourseDetail);
router.post(`/edit/:CourseId`, Controller.handlerEditCourse);
router.get(`/like/:CourseId`, Controller.handlerLikeCourse);
router.get(`/generatePDF/:CourseId`, Controller.handleGeneratePDFCourse);
router.get(`/delete/:CourseId`, Controller.handlerDeleteCourse);


module.exports = router;

