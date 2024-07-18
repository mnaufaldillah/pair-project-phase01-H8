const Controller = require("../controllers/controller");
const router = require("express").Router();

router.post(`/add`, Controller.handlerAddCourse);
router.get(`/detail/:CourseId`, Controller.renderCourseDetail);
router.post(`/edit/:CourseId`, Controller.handlerEditCourse);
router.get(`/like/:CourseId`, Controller.handlerLikeCourse);
router.get(`/generatePDF/:CourseId`, Controller.handleGeneratePDFCourse);
router.get(`/delete/:CourseId`, Controller.handlerDeleteCourse);


module.exports = router;

