import React from "react";
import { Button, Form, Input } from "antd";

import classes from "./authForm.module.scss";
import { requiredMessage } from "../Form/Form";
import { AUTH_ACTIONS } from "src/constants/navbar";

const SignupForm = ({ onSignupFinish }: { onSignupFinish: any }) => {
  return (
    <Form
      name="signup"
      onFinish={onSignupFinish}
      initialValues={{
        remember: true,
      }}
      className={classes.form}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: requiredMessage }]}
      >
        {/* <label className={classes.label} htmlFor={"username"}>
          Username
          <span>*</span>
        </label> */}
        <Input className={classes.input} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: requiredMessage },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        {/* <label className={classes.label} htmlFor={"email"}>
          Email
          <span>*</span>
        </label> */}
        <Input className={classes.input} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: requiredMessage }]}
      >
        {/* <label className={classes.label} htmlFor={"password"}>
          Password
          <span>*</span>
        </label> */}
        <Input.Password className={classes.input} />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Passwords do not match!");
            },
          }),
        ]}
      >
        {/* <label className={classes.label} htmlFor={"confirmPassword"}>
          Confirm Password
          <span>*</span>
        </label> */}
        <Input.Password className={classes.input} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          className={classes.submitButton}
        >
          {AUTH_ACTIONS.SIGNUP}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
