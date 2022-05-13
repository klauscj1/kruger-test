const baseUrl = import.meta.env.VITE_API_URL;

const callApi = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  console.log(url);
  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export { callApi };
