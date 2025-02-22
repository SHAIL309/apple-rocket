export const getUserData = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    return JSON.parse(userData);
  } else {
    return null;
  }
};
