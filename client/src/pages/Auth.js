import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../index";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/constants";
import { login, registration } from "../http/userAPI";

const Auth = observer(() => {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const { pathname } = useLocation();
  const isLogin = pathname === LOGIN_ROUTE;

  const changeStateAuth = (e) => {
    const { name, value } = e.target;
    setAuth((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(auth.email, auth.password);
      } else {
        data = await registration(auth.email, auth.password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <div style={{ width: "600px", backgroundColor: "grey" }} className="p-5">
        <h2
          style={{
            textAlign: "center",
          }}
        >
          {isLogin ? "Authorization" : "Registration"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="email"
            value={auth.email}
            name="email"
            onChange={(e) => changeStateAuth(e)}
            style={{ width: "50%" }}
          />
          <input
            placeholder="password"
            value={auth.password}
            name="password"
            onChange={(e) => changeStateAuth(e)}
            style={{ width: "50%" }}
          />

          <div style={{ position: "relative" }}>
            {isLogin ? (
              <Link to={REGISTRATION_ROUTE}>
                {isLogin ? "No account ? REGISTER" : "Login"}
              </Link>
            ) : (
              <Link to={LOGIN_ROUTE}>
                {isLogin
                  ? "No account ? REGISTER"
                  : "Already have an account ? Login"}
              </Link>
            )}
            <button type="submit" style={{ position: "absolute", right: 0 }}>
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Auth;
