import React from "react";
import { Link } from "react-router-dom";
import classes from "./notFound.module.scss";
import { NOT_FOUND } from "src/constants/notfound";
import { loggedIn } from "src/utils/helper";

const NotFound: React.FC = () => {
  const isLoggedIn = loggedIn();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.heading}>{NOT_FOUND.header}</h1>
        <p className={classes.message}>{NOT_FOUND.message}</p>
        <Link
          to={
            isLoggedIn ? NOT_FOUND.link.loggedInPath : NOT_FOUND.link.guestPath
          }
          className={classes.homeLink}
        >
          {NOT_FOUND.link.label}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
