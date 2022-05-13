const { response } = require("express");
const { getEmployeesById } = require("../repositories/employees_repository");
const {
  getUserByUsernameAndPassword,
} = require("../repositories/users_repository");

const login = (req, res = response) => {
  console.log("req.body", req.body);
  const data = req.body;
  const user = getUserByUsernameAndPassword(data.username, data.password);
  if (!user) {
    return res.status(404).json({
      error: "No existe el usuario con esas credenciales",
    });
  }
  if (user.admin === false) {
    const employee = getEmployeesById(user.employee_id);
    user.employee = employee;
  }
  res.status(200).json(user);
};

module.exports = {
  login,
};
