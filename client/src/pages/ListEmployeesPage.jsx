import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { getEmployees } from "../services/EmployeeService";

export const ListEmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const onClickNewEmployeee = () => {
    navigate("/employee");
  };

  useEffect(() => {
    getEmployees()
      .then((response) => response.json())
      .then((employees) => setEmployees(employees));
  }, []);

  return (
    <MainLayout pageTitle={"Lista de Empleados"}>
      <button
        className="bg-blue-700 shadow-sm shadow-blue-500 w-48 h-12 text-white rounded mt-2 hover:bg-blue-600"
        onClick={onClickNewEmployeee}
      >
        Nuevo empleado
      </button>
      {/* address: ""
birthday: ""
date_vaccinated: ""
dni: "0105409924"
dose: null
email: "clauschochoe@gmail.com"
first_name: "CLAUS"
id: "44fbdbbe-bfbf-4b0e-8186-4e1903ca9d1d"
last_name: "CHOCHO"
mobile: ""
vaccinated: null
vaccine: "" */}
      <table className="w-full mt-3">
        <thead>
          <tr>
            <th>CEDULA</th>
            <th>NOMBRE</th>
            <th>APELLIDO</th>
            <th>EMAIL</th>
            <th>VACUNADO</th>
            <th>FECHA VACUNA</th>
            <th>DOSIS</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.dni}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.vaccinated}</td>
                <td>{employee.date_vaccinated}</td>
                <td>{employee.dose}</td>
                <td>
                  <button className="bg-blue-700 shadow-sm shadow-blue-500 w-24 h-10 text-white rounded mt-2 hover:bg-blue-600 mx-2">
                    Editar
                  </button>
                  <button className="bg-red-700 shadow-sm shadow-red-500 w-24 h-10 text-white rounded mt-2 hover:bg-red-600">
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </MainLayout>
  );
};
