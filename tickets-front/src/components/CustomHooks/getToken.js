import Cookies from "js-cookie";
const getToken = () => {
  const token = Cookies.get("jwtToken");
  return token;
};

export default getToken