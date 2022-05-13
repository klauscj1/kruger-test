import { callApi } from "../utils/fetch";

export const insertEmployee = (data) => {
  return callApi("employees", data, "POST");
};

export const getEmployees = () => {
  return callApi("employees", {}, "GET");
};

export const updateEmployee = (data) => {
  return callApi(`employees/${data.id}`, data, "PUT");
};
