import { useNavigate } from "react-router-dom";
import { login } from "../services/UserService";
import { Formik, ErrorMessage } from "formik";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const LoginPage = () => {
  const { saveUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onSubmitForm = async (data) => {
    try {
      const respuesta = await login(data);
      const user = await respuesta.json();
      if (user) {
        saveUser(user);
        if (user.admin == true) {
          navigate("/employees");
        } else {
          navigate("/employee");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-6/12 h-full bg-blue-600 flex flex-col justify-center content-center align-middle text-center text-3xl text-white">
        <p>Inventario del estado de vacunación de los empleados</p>
      </div>
      <div className="w-6/12 h-full flex flex-col ">
        <div className="w-6/12  m-auto">
          <h1 className="text-3xl font-bold mb-2">Ingrese sus credenciales</h1>

          <Formik
            initialValues={{ username: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = "Required";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => onSubmitForm(values)}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => (
              <form className=" h-auto " onSubmit={handleSubmit}>
                <div className="flex flex-col py-1">
                  <label htmlFor="username" className="py-2">
                    Usename
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="rounded border-2 h-10 px-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 text-sm"
                />
                <div className="flex flex-col py-1">
                  <label htmlFor="password" className="py-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="rounded border-2 h-10 px-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 border-0  rounded h-11 mt-4 hover:bg-blue-600 text-white "
                >
                  Iniciar sesión
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
