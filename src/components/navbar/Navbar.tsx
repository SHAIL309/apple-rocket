import React, { useState } from "react";
import logo from "../../assets/images/Logo.png";

import { Image } from "antd";
import { AUTH_ACTIONS, NAVBAR_OPTIONS } from "../../constants/navbar";
import classes from "./navbar.module.scss";
import { useWindowSize } from "src/utils/useWindowSize";
import { MenuOutlined } from "@ant-design/icons";
import { useStoreActions } from "src/store/hooks";
import { userAuthAction } from "src/store/actions";
import { logout } from "src/store/reducers/auth";

const navList = (
  isLoggedIn: boolean,
  onclick?: (key: string) => void,
  isMobile?: boolean
) => {
  const options = isLoggedIn ? NAVBAR_OPTIONS.loggedIn : NAVBAR_OPTIONS.public;
  return (
    <ul className={`${classes.list} ${isMobile ? classes.mobileList : ""}`}>
      {options.map((o, i) => (
        <li
          key={`${o}-${i}`}
          className={classes.listItem}
          onClick={() => {
            if (onclick) onclick(o);
          }}
        >
          {o}
        </li>
      ))}
    </ul>
  );
};

const Navbar: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [show, setShow] = useState(false);
  const { isMobile } = useWindowSize();
  const action = useStoreActions({ userAuthAction, logout });

  const handleAction = (k: string) => {
    switch (k) {
      case AUTH_ACTIONS.LOGOUT:
        return action.logout();
      case AUTH_ACTIONS.LOGIN:
        return action.userAuthAction({ data: AUTH_ACTIONS.LOGIN });
      case AUTH_ACTIONS.SIGNUP:
        return action.userAuthAction({ data: AUTH_ACTIONS.SIGNUP });
      default:
        return;
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
      <>
        <Image src={logo} preview={false} />
      </>
      {getList()}
    </nav>
  );
};

export default Navbar;
