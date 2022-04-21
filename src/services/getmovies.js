import http from "../services/httpservice";

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}
