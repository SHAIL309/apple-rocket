import React, { useState } from "react";

import classes from "./userAuthForm.module.scss";

import { AUTH_ACTIONS } from "src/constants/header";
import { getUserData } from "src/utils/helper";
import { Form } from "../Form";
import { requiredMessage } from "../Form/Form";

export const formFields = [
  {
    label: "Username",
    name: "username",
    rules: [{ required: true, message: requiredMessage }],
  },

  {
    label: "Password",
    name: "password",
    rules: [{ required: true, message: requiredMessage }],
  },
  ,
];

const LoginForm = ({ onLoginFinish }: { onLoginFinish: any }) => {
  const [error, setError] = useState("");
  const userData = getUserData();

  const handelSubmit = (values: any) => {
    setError("");
    if (!userData) {
      return setTimeout(() => {
        setError("Are you a new user? you can signup first");
      }, 1000);
    }
    if (
      values.username !== userData.username ||
      values.password !== userData.password
    ) {
      return setTimeout(() => {
        setError("Username or Password didn't match");
      }, 1000);
    } else {
      return onLoginFinish(values);
    }
  };
  return (
    <>
      <Form
        formName="Login"
        formFields={formFields}
        onSubmit={handelSubmit}
        SubmitButtonText={AUTH_ACTIONS.LOGIN}
      />

      {!!error && <span className={classes.error}>{error}</span>}
    </>
  );
};

export default LoginForm;
