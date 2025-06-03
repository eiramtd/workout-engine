const express = require('express');
const managerController = require('../controller/managerController');
const managerRouter = express.Router();

managerRouter.post("/addStatus",managerController.addStatus);
managerRouter.post("/removeStatus",managerController.removeStatus);
managerRouter.post("/addClient",managerController.addClient);
managerRouter.post("/removeClient",managerController.removeClient);
managerRouter.post("/update",managerController.updateManager);
managerRouter.post("/getAllManagers",managerController.getAllManagers);
managerRouter.post("/:username",managerController.getManagerByUsername);

module.exports = managerRouter;
