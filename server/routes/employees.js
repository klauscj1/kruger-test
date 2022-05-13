const { Router } = require("express");
const {
  findEmployees,
  newEmployee,
  setEmployee,
} = require("../controller/employees");

const router = Router();

router.get("/", findEmployees);
router.post("/", newEmployee);
router.put("/:id", setEmployee);

module.exports = router;
