import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { MainLayout } from "../layout/MainLayout";
import { Formik, ErrorMessage } from "formik";
import { insertEmployee, updateEmployee } from "../services/EmployeeService";

const tiposVacunas = ["Sputnik", "AstraZeneca", "Pfizer", "Jhonson&Jhonson"];

const fields = {
  birthday: "",
  address: "",
  mobile: "",
  vaccinated: null,
  vaccine: "",
  date_vaccinated: "",
  dose: null,
};

export const EmployeePage = () => {
  const { user } = useContext(GlobalContext);
  const [message, setMessage] = useState("");
  const { admin } = user;
  const navigate = useNavigate();

  const onSaveAdmin = async (values) => {
    const newEmployee = { ...values, ...fields };
    await insertEmployee(newEmployee);
    goBack();
  };

  const onSaveEmployee = async (values) => {
    const response = await updateEmployee(values);
    const data = await response.json();

    setMessage("Se ha actualizado los datos con exito");
  };

  const goBack = () => {
    navigate("/employees");
  };

  return (
    <MainLayout pageTitle={"Crear/Editar empleado"}>
      <div className="w-full flex flex-row">
        <div className="w-2/6">
          <Formik
            initialValues={{
              dni: user.employee.dni || "",
              first_name: user.employee.first_name || "",
              last_name: user.employee.last_name || "",
              email: user.employee.email || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.first_name) {
                errors.first_name = "Required";
              }
              if (!values.last_name) {
                errors.last_name = "Required";
              }
              if (!values.dni) {
                errors.dni = "Required";
              }
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Email incorrecto";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => onSaveAdmin(values)}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col py-1">
                    <label htmlFor="dni" className="py-2">
                      Cédula
                    </label>
                    <input
                      readOnly={!user.admin}
                      type="text"
                      name="dni"
                      id="dni"
                      className="rounded border-2 h-10 px-2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dni}
                    />
                  </div>
                  <ErrorMessage
                    name="dni"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                  <div className="flex flex-col py-1">
                    <label htmlFor="first_name" className="py-2">
                      Nombres
                    </label>
                    <input
                      readOnly={!user.admin}
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="rounded border-2 h-10 px-2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.first_name}
                    />
                  </div>
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                  <div className="flex flex-col py-1">
                    <label htmlFor="last_name" className="py-2">
                      Apellidos
                    </label>
                    <input
                      readOnly={!user.admin}
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="rounded border-2 h-10 px-2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                    />
                  </div>
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                  <div className="flex flex-col py-1">
                    <label htmlFor="email" className="py-2">
                      Correo electrónico
                    </label>
                    <input
                      readOnly={!user.admin}
                      type="email"
                      name="email"
                      id="email"
                      className="rounded border-2 h-10 px-2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                  {admin && (
                    <>
                      <button
                        type="submit"
                        className="bg-blue-700 shadow-sm shadow-blue-500 h-12 text-white rounded mt-2 hover:bg-blue-600 w-full mb-2"
                      >
                        Guardar
                      </button>
                      {/* <button className="bg-blue-700 shadow-sm shadow-blue-500 h-12 text-white rounded mt-2 hover:bg-blue-600 w-full mb-2">
                      Actualizar
                    </button> */}
                      <button
                        className=" h-12 text-blue-700  mt-2 w-full border-2 rounded"
                        onClick={goBack}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </form>
              );
            }}
          </Formik>
        </div>

        {!admin && (
          <div className="w-2/6 h-full px-4">
            {message.length > 0 && (
              <p className="text-xl text-green-700 font-semibold">{message}</p>
            )}
            <Formik
              initialValues={{
                address: user.employee.address || "",
                birthday: user.employee.birthday || "",
                date_vaccinated: user.employee.date_vaccinated || "",
                dose: user.employee.dose || 0,
                mobile: user.employee.mobile || "",
                vaccinated: user.employee.vaccinated || "false",
                vaccine: user.employee.vaccine || "",
                id: user.employee.id,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.address) {
                  errors.address = "Required";
                }
                if (!values.birthday) {
                  errors.birthday = "Required";
                }
                if (!values.mobile) {
                  errors.mobile = "Required";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) =>
                onSaveEmployee(values)
              }
            >
              {({ handleSubmit, handleChange, handleBlur, values }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col py-1">
                      <label htmlFor="birthday" className="py-2">
                        Fecha de nacimiento
                      </label>
                      <input
                        type="date"
                        name="birthday"
                        id="birthday"
                        className="rounded border-2 h-10 px-2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.birthday}
                      />
                    </div>
                    <ErrorMessage
                      name="birthday"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                    <div className="flex flex-col py-1">
                      <label htmlFor="address" className="py-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="rounded border-2 h-10 px-2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                      />
                    </div>
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                    <div className="flex flex-col py-1">
                      <label htmlFor="mobile" className="py-2">
                        Telefono movil
                      </label>
                      <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        className="rounded border-2 h-10 px-2"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mobile}
                      />
                    </div>
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                    <div className="flex flex-col py-1">
                      <label htmlFor="vaccinated" className="py-2">
                        Estado de vacunación
                      </label>
                      <div className="flex flex-row items-center">
                        <input
                          type="radio"
                          id="contactChoice1"
                          name="vaccinated"
                          value="true"
                          className="mx-4"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.vaccinated === "true"}
                        />
                        <label htmlFor="contactChoice1">Vacunado</label>
                        <input
                          type="radio"
                          id="contactChoice2"
                          name="vaccinated"
                          value="false"
                          className="mx-4"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.vaccinated === "false"}
                        />
                        <label htmlFor="contactChoice2">No vacunado</label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="vaccinated"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                    <div className="bg-gray-50">
                      <div className="flex flex-col py-1">
                        <label htmlFor="vaccine" className="py-2">
                          Tipo de vacuna
                        </label>
                        <div className="flex flex-row items-center">
                          {tiposVacunas.map((vacuna, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-row items-center"
                              >
                                <input
                                  type="radio"
                                  id={vacuna}
                                  name="vaccine"
                                  value={vacuna}
                                  className="mx-4"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  checked={values.vaccine === vacuna}
                                />
                                <label htmlFor={vacuna}>{vacuna}</label>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex flex-col py-1">
                          <label htmlFor="date_vaccinated" className="py-2">
                            Fecha de vacunacion
                          </label>
                          <input
                            type="date"
                            name="date_vaccinated"
                            id="date_vaccinated"
                            className="rounded border-2 h-10 px-2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.date_vaccinated}
                          />
                        </div>

                        <div className="flex flex-col py-1">
                          <label htmlFor="dose" className="py-2">
                            Numero de dosis
                          </label>
                          <input
                            type="number"
                            name="dose"
                            id="dose"
                            className="rounded border-2 h-10 px-2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dose}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-700 shadow-sm shadow-blue-500 h-12 text-white rounded mt-2 hover:bg-blue-600 w-full mb-2"
                    >
                      Guardar
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
