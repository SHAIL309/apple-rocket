import React, { useState } from "react";
import logo from "../../assets/images/Logo.png";

import { Image } from "antd";
import { AUTH_ACTIONS } from "../../constants/navbar";
import classes from "./header.module.scss";
import { useWindowSize } from "src/utils/useWindowSize";
import {
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStoreActions } from "src/store/hooks";
import { userAuthAction } from "src/store/actions";
import { logout } from "src/store/reducers/auth";
import { getUserData } from "src/utils/helper";

const NAVBAR_OPTIONS = {
  loggedIn: [{ label: AUTH_ACTIONS.LOGOUT, icon: <LogoutOutlined /> }],
  public: [
    { label: AUTH_ACTIONS.LOGIN, icon: <LoginOutlined /> },
    { label: AUTH_ACTIONS.SIGNUP, icon: <UserAddOutlined /> },
  ],
};

const navList = (
  isLoggedIn: boolean,
  onclick?: (key: string) => void,
  isMobile?: boolean
) => {
  const userData = getUserData();

  const options = isLoggedIn
    ? [
        { label: `Welcome ${userData.username}`, icon: <UserOutlined /> },
        ...NAVBAR_OPTIONS.loggedIn,
      ]
    : NAVBAR_OPTIONS.public;
  return (
    <ul className={`${classes.list} ${isMobile ? classes.mobileList : ""}`}>
      {options.map((o, i) => (
        <li
          key={i}
          className={classes.listItem}
          onClick={() => {
            if (onclick) onclick(o.label);
          }}
        >
          {o.icon}
          <span> {o.label}</span>
        </li>
      ))}
    </ul>
  );
};

const Header: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [show, setShow] = useState(false);
  const { isMobile } = useWindowSize();
  const action = useStoreActions({ userAuthAction, logout });

  const closeMenu = () => setShow(false);

  const handleAction = (k: string) => {
    switch (k) {
      case AUTH_ACTIONS.LOGOUT:
        return setTimeout(() => action.logout(), 1000);
      case AUTH_ACTIONS.LOGIN:
        closeMenu();
        return action.userAuthAction({ data: AUTH_ACTIONS.LOGIN });
      case AUTH_ACTIONS.SIGNUP:
        closeMenu();
        return action.userAuthAction({ data: AUTH_ACTIONS.SIGNUP });
      default:
        closeMenu();
    }
  };

  const getList = () => {
    return (
      <div className={classes.menuWrapper}>
        {isMobile ? (
          <>
            <MenuOutlined
              className={classes.menu}
              onClick={() => {
                setShow(!show);
              }}
            />
            {show && isMobile && navList(isLoggedIn, handleAction, true)}
          </>
        ) : (
          <> {navList(isLoggedIn, handleAction)}</>
        )}
      </div>
    );
  };

  return (
    <nav className={classes.navContainer}>
      <span className={classes.logo}>
        <Image src={logo} preview={false} />
      </span>
      {getList()}
    </nav>
  );
};

export default Header;
