import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../index";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/constants";

const Navbar = observer(() => {
  const { user } = useContext(Context);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.clear();
  };

  return (
    <nav
      class="navbar navbar-expand-lg bg-blue"
      style={{ backgroundColor: "#73AFB6" }}
    >
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Home
        </Link>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to={SHOP_ROUTE}>
                Shop
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to={BASKET_ROUTE}>
                Basket
              </Link>
            </li>
            {!user.isAuth && (
              <li class="nav-item">
                <Link class="nav-link" to={LOGIN_ROUTE}>
                  Authorize
                </Link>
              </li>
            )}
            {user.isAuth && (
              <>
                <button onClick={logOut}>Logout</button>
                <li class="nav-item">
                  <Link class="nav-link" to={ADMIN_ROUTE}>
                    Admin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
