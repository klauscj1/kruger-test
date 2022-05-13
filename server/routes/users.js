const { Router } = require("express");
const { login } = require("../controller/users");

const router = Router();

router.post("/", login);

module.exports = router;
