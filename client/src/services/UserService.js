import { callApi } from "../utils/fetch";

export const login = (data) => {
  return callApi("auth/", data, "POST");
};
