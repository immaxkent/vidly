import http from "./httpservice";
import jwtDecode from "jwt-decode";

const apiEnd = "http://localhost:3900/api/auth";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEnd, { email, password });
  localStorage.setItem("token", jwt);
}
export function logout() {
  localStorage.removeItem("token");
}

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    console.log(user);
  } catch (ex) {}
}

export default {
  login,
  logout,
  // getJwt
  getCurrentUser
};
