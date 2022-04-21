import http from "../services/httpservice";

export function getGenres() {
  return http.get("http://localhost:3900/api/genres");
}

// export const genres = [
//   { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
//   { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
//   { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
// ];
// http.get("http://localhost:3900/api/genres");
