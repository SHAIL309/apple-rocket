export const getUserData = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    return JSON.parse(userData);
  } else {
    return null;
  }
};

export const loggedIn = () => {
  const status = localStorage.getItem("isLoggedIn");
  if (status) {
    return JSON.parse(status);
  } else {
    return false;
  }
};
