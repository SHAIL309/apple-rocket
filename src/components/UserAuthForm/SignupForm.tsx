import React from "react";

import { requiredMessage } from "../Form/Form";
import { AUTH_ACTIONS } from "src/constants/header";
import { Form } from "../Form";

export const formFields = [
  {
    label: "Username",
    name: "username",
    rules: [{ required: true, message: requiredMessage }],
  },
  {
    label: "Email",
    name: "email",
    rules: [
      { required: true, message: requiredMessage },
      { type: "email", message: "Please enter a valid email!" },
    ],
  },
  {
    label: "Password",
    name: "password",
    rules: [{ required: true, message: requiredMessage }],
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    dependencies: ["password"],
    rules: [
      { required: true, message: "Please confirm your password!" },
      ({ getFieldValue }: { getFieldValue: any }) => ({
        validator(_: any, value: any) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject("Passwords do not match!");
        },
      }),
    ],
  },
];

const SignupForm = ({ onSignupFinish }: { onSignupFinish: any }) => {
  return (
    <Form
      formName={"SignUp"}
      onSubmit={onSignupFinish}
      formFields={formFields}
      SubmitButtonText={AUTH_ACTIONS.SIGNUP}
    />
  );
};

export default SignupForm;
