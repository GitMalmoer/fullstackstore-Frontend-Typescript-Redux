import React from "react";
import { Root } from "react-dom/client";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { cartItemModel, userModel } from "../../Interfaces";
import { RootState } from "../../Storage/Redux/store";
import {
  setLoggedInUser,
  emptyUserState,
} from "../../Storage/Redux/userAuthSlice";
import { SD_Roles } from "../../Utility/SD";
let logo = require("../../Assets/Images/logotransp.png");

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="nav-link" aria-current="page" to="/">
            <img
              src={logo}
              alt="logo"
              className="m-1"
              style={{ height: "45px" }}
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              {userData.role == SD_Roles.ADMIN ? (
                // if admin render admin panel
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Panel
                  </a>
                  <ul className="dropdown-menu">
                    <li
                      className="dropdown-item"
                      onClick={() => navigate("/order/myorders")}
                      style={{ cursor: "pointer" }}
                    >
                      My orders
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => navigate("/order/allorders")}
                      style={{ cursor: "pointer" }}
                    >
                      All orders
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => navigate("/menuItem/menuItemList/")}
                      style={{ cursor: "pointer" }}
                    >
                      Menu Items
                    </li>
                  </ul>
                </li>
              ) : (
                // if not admin render myorders
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/order/myorders"
                  >
                    Orders
                  </NavLink>
                </li>
              )}

              {/* end of dropdown */}

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/ShoppingCart"
                >
                  {" "}
                  <i className="bi bi-cart"></i>{" "}
                  {userData.id && `${shoppingCartFromStore.length}`}
                </NavLink>
              </li>

              <NavLink
                className="nav-link"
                aria-current="page"
                to="/authentication"
              >
                Authentication
              </NavLink>
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/authorization"
              >
                Authorization
              </NavLink>

              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.id && (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Welcome, {userData.fullName}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={handleLogout}
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {/* hide login btn and register */}
                {!userData.id && (
                  <>
                    {" "}
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-white">
                      <NavLink
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
