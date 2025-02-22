import React from "react";
import { Button, Form, Input } from "antd";
import classes from "./authForm.module.scss";
import { requiredMessage } from "../Form/Form";

const LoginForm = ({ onLoginFinish }: { onLoginFinish: any }) => {
  return (
    <Form
      name="login"
      onFinish={onLoginFinish}
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
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
