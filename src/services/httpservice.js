import axios from "axios";
// import auth from "./authService";

// axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(tokenKey); // this was added to accomodate the configure.JSON false/true modification in the node api

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;
  if (!expectedError) {
    // Raven.captureException(error);
    console.log("Error details are: ", error);
    alert("an unexpected error occured");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
