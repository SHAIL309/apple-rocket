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

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
