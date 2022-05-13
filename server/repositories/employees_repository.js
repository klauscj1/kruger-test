const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { insertUser } = require("./users_repository");

const readEmployessFile = () => {
  try {
    const jsonString = fs.readFileSync("data/employess.json");
    const employees = JSON.parse(jsonString);
    return employees;
  } catch (err) {
    console.log(err);
    return;
  }
};

const writeEmployeesFile = (employees) => {
  try {
    const jsonString = JSON.stringify(employees);
    fs.writeFileSync("data/employess.json", jsonString);
  } catch (err) {
    console.log(err);
    return;
  }
};

const getEmployees = () => {
  const employees = readEmployessFile();
  return employees;
};

const insertEmployee = (employee) => {
  employee.id = uuidv4();
  const employees = readEmployessFile();
  const newEmployees = [...employees, employee];
  writeEmployeesFile(newEmployees);
  const user = {
    username: employee.dni,
    password: employee.dni,
    admin: false,
    employee_id: employee.id,
  };
  insertUser(user);
  return readEmployessFile();
};

const getEmployeesById = (employeeId) => {
  const employees = readEmployessFile();
  return employees.find((employee) => employee.id === employeeId);
};

const updateEmployees = (employeeId, employeeData) => {
  const employees = readEmployessFile();
  let employeeToUpdate = employees.find(
    (employee) => employee.id === employeeId
  );
  employeeToUpdate.vaccinated = employeeData.vaccinated;
  employeeToUpdate.vaccine = employeeData.vaccine;
  employeeToUpdate.dose = employeeData.dose;
  employeeToUpdate.birthday = employeeData.birthday;
  employeeToUpdate.date_vaccinated = employeeData.date_vaccinated;
  employeeToUpdate.address = employeeData.address;
  employeeToUpdate.mobile = employeeData.mobile;

  const newEmployees = employees.map((employee) => {
    if (employee.id === employeeToUpdate.id) {
      return employeeToUpdate;
    } else {
      return employee;
    }
  });
  writeEmployeesFile(newEmployees);
};

module.exports = {
  getEmployees,
  insertEmployee,
  getEmployeesById,
  updateEmployees,
};
