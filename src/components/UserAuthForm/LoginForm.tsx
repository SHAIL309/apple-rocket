import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import classes from "./authForm.module.scss";
import { requiredMessage } from "../Form/Form";
import { AUTH_ACTIONS } from "src/constants/navbar";
import { getUserData } from "src/utils/helper";

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
        name="login"
        onFinish={handelSubmit}
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className={classes.submitButton}
          >
            {AUTH_ACTIONS.LOGIN}
          </Button>
        </Form.Item>
      </Form>
      {!!error && <span className={classes.error}>{error}</span>}
    </>
  );
};

export default LoginForm;
