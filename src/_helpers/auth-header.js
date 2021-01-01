export function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    const Authorization = "Authorization";
    return { [Authorization]: `Bearer ${user.token}` };
  }

  return {};
}
