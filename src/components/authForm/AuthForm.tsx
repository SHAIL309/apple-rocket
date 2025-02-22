import React from "react";

import { useAppSelector, useStoreActions } from "src/store/hooks";
import { AUTH_ACTIONS } from "src/constants/navbar";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { IUser } from "src/interfaces/auth";
import classes from "./authForm.module.scss";
import { userAuthAction, userLogin, userSignUp } from "src/store/actions";
import { useNavigate } from "react-router-dom";
import { Alert, Modal } from "antd";

const AuthForm = () => {
  const { authAction, actionLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const actions = useStoreActions({ userLogin, userSignUp, userAuthAction });
  const isLogin = authAction === AUTH_ACTIONS.LOGIN;

  const handelModalClose = (cb?: () => void) => {
    actions.userAuthAction({ data: "", cb: !!cb ? cb : () => {} });
  };

  const onSubmit = (values: IUser) => {
    isLogin
      ? actions.userLogin({
          data: values,
          cb: () => {
            setTimeout(() => {
              handelModalClose(() => navigate("/products"));
            }, 2000);
          },
        })
      : actions.userSignUp({
          data: values,
          cb: () => {
            setTimeout(() => {
              handelModalClose(() => navigate("/products"));
            }, 2000);
          },
        });
  };

  const renderForm = () =>
    isLogin ? (
      <LoginForm onLoginFinish={onSubmit} />
    ) : (
      <SignupForm onSignupFinish={onSubmit} />
    );

  const modalFooter = () => (
    <span>
      {isLogin ? (
        <>
          New user?{" "}
          <span
            className={classes.action}
            onClick={() => {
              actions.userAuthAction({ data: AUTH_ACTIONS.SIGNUP });
            }}
          >
            Signup
          </span>
        </>
      ) : (
        <>
          Existing user?{" "}
          <span
            className={classes.action}
            onClick={() => {
              actions.userAuthAction({ data: AUTH_ACTIONS.LOGIN });
            }}
          >
            Login
          </span>
        </>
      )}
    </span>
  );

  return (
    <>
      <Modal
        title={isLogin ? "Login Form" : "Signup form"}
        open={!!authAction}
        onCancel={() => {
          handelModalClose();
        }}
        cancelButtonProps={{}}
        loading={actionLoading}
        footer={modalFooter()}
      >
        <div className={classes.container}>
          {/* Toggle between Login and Signup */}
          {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          onClick={() => setIsLogin(true)}
          type="primary"
          style={{ marginRight: "10px" }}
        >
          Login
        </Button>
        <Button onClick={() => setIsLogin(false)} type="default">
          Signup
        </Button>
      </div> */}

          {renderForm()}
        </div>
      </Modal>
    </>
  );
};

export default AuthForm;
