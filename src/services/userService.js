import http from "./httpservice";

const apiEnd = "http://localhost:3900/api/users";

export function register(user) {
  return http.post(apiEnd, {
    email: user.email,
    password: user.password,
    name: user.name
  });
}
