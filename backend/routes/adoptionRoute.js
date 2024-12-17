const express = require("express");
const router = express.Router();
const adoptionController = require('../controller/adoptionController');


router.post("/", adoptionController.createAdoption);
router.get("/", adoptionController.getAdoption);
router.get("/:id", adoptionController.getAdoptionById);
router.put("/:id", adoptionController.updateAdoptionStatus);
router.delete("/:id", adoptionController.deleteAdoption);

module.exports = router;




