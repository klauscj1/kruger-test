const { response } = require("express");
const {
  getEmployees,
  insertEmployee,
  updateEmployees,
} = require("../repositories/employees_repository");

const findEmployees = (req, res = response) => {
  const employees = getEmployees();
  return res.status(200).json(employees);
};

const newEmployee = (req, res = response) => {
  const newEmployee = req.body;
  insertEmployee(newEmployee);
  return res.status(200).json(newEmployee);
};

const setEmployee = (req, res = response) => {
  const newEmployee = req.body;
  const { id } = req.params;
  console.log("setEmployee", { newEmployee, id });
  updateEmployees(id, newEmployee);
  return res.status(200).json(newEmployee);
};

module.exports = {
  findEmployees,
  newEmployee,
  setEmployee,
};
