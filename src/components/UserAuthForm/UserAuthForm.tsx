import React, { useState } from "react";

import { useAppSelector, useStoreActions } from "src/store/hooks";
import { AUTH_ACTIONS } from "src/constants/header";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { IUser } from "src/interfaces/auth";
import classes from "./userAuthForm.module.scss";
import { userAuthAction, userLogin, userSignUp } from "src/store/actions";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const UserAuthForm = () => {
  const { authAction, actionLoading } = useAppSelector((state) => state.auth);
  const [blockChange, setBlockChange] = useState(false);
  const navigate = useNavigate();
  const actions = useStoreActions({ userLogin, userSignUp, userAuthAction });
  const isLogin = authAction === AUTH_ACTIONS.LOGIN;

  const handelModalClose = (cb?: () => void) => {
    if (blockChange) {
      return;
    }
    actions.userAuthAction({ data: "", cb: !!cb ? cb : () => {} });
  };

  const handleBlockChange = () => setBlockChange(!blockChange);

  const onSubmit = (values: IUser, cb: () => void) => {
    handleBlockChange();
    isLogin
      ? actions.userLogin({
          data: values,
          cb: () => {
            if (cb) {
              cb();
            }
            setTimeout(() => {
              handleBlockChange();
              handelModalClose(() => navigate("/products"));
            }, 2000);
          },
        })
      : actions.userSignUp({
          data: values,
          cb: () => {
            if (cb) {
              cb();
            }
            setTimeout(() => {
              handleBlockChange();
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
            className={
              blockChange
                ? `${classes.action} ${classes.disable}`
                : classes.action
            }
            onClick={() => {
              if (blockChange) {
                return;
              }
              actions.userAuthAction({ data: AUTH_ACTIONS.SIGNUP });
            }}
          >
            {AUTH_ACTIONS.SIGNUP}
          </span>
        </>
      ) : (
        <>
          Existing user?{" "}
          <span
            className={
              blockChange
                ? `${classes.action} ${classes.disable}`
                : classes.action
            }
            onClick={() => {
              if (blockChange) {
                return;
              }
              actions.userAuthAction({ data: AUTH_ACTIONS.LOGIN });
            }}
          >
            {AUTH_ACTIONS.LOGIN}
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
        onClose={() => {
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

export default UserAuthForm;
