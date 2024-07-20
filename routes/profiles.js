const Controller = require("../controllers/controller");
const router = require("express").Router();

const attachReqToModel = (req, res, next) => {
    sequelize.addHook(`beforeCreate`, (instance) => {
        instance.req = req;
    });
    next();
  }

router.post(`/edit/:ProfileId`, attachReqToModel, Controller.handlerEditProfile);

module.exports = router;