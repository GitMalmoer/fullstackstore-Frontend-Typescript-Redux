import React, { useState } from "react";
import { useLoginUserMutation } from "../Apis/authApi";
import { inputHelper } from "../Helper";
import { apiResponse, userModel } from "../Interfaces";
import jwtDecode from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";


function Login() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });
  const [loginUser] = useLoginUserMutation();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });
    if(response.data)
    {
      setError("");
      const {token} = response.data.result;
      localStorage.setItem("token",token);
      const {id,fullName,email,role} : userModel = jwtDecode(token);
      dispatch(setLoggedInUser({id,fullName,email,role}));
      navigate("/");
      console.log(response);
    }
    else if(response.error.data)
    {
      console.log(response.error.data.errorMessages[0]);
      setError(response.error.data.errorMessages[0]);
    }

    setLoading(false);
  };

  return (
    <div className="container text-center">
      {loading && <MainLoader/>}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="userName"
              onChange={handleUserInput}
              value={userInput.userName}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              onChange={handleUserInput}
              value={userInput.password}
            />
          </div>
        </div>

        <div className="mt-2">
        {error && <div className="text-center text-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
