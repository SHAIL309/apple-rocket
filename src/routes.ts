import { lazy } from "react";

const LandingPage = lazy(() => import("./pages/login"));
const LoginPage = lazy(() => import("./pages/login"));
const SignUpPage = lazy(() => import("./pages/signUp"));

export const routes = [
  { path: "", name: "Landing", component: LandingPage, isPrivate: false },
  {
    path: "login",
    name: "Login",
    component: LoginPage,
    isPrivate: false,
  },
  {
    path: "sign-up",
    name: "Sign Up",
    component: SignUpPage,
    isPrivate: false,
  },
];
