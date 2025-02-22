export const AUTH_ACTIONS = {
  LOGOUT: "Logout",
  LOGIN: "Login",
  SIGNUP: "Sign up",
};

export const NAVBAR_OPTIONS = {
  loggedIn: [AUTH_ACTIONS.LOGOUT],
  public: [AUTH_ACTIONS.LOGIN, AUTH_ACTIONS.SIGNUP],
};
