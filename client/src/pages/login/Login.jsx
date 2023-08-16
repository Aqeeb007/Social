import { useState } from "react";

import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error("Something is wrong!");
      });
  };

  return (
    <div className="login w-screen h-screen bg-gray-200 flex items-center justify-center">
      <div className="loginWrapper flex w-[70%] h-[70%]">
        <div className="loginLeft flex flex-col justify-center flex-1">
          <h3 className="loginLogo loginLogo text-6xl font-extrabold text-blue-600 mb-2">
            Chatbook
          </h3>
          <span className="loginDesc text-2xl">
            Chatbook helps you connect and share
            <br /> with the people in your life.
          </span>
        </div>
        <div className="loginRight flex flex-col justify-center flex-1">
          <form
            className="loginBox p-5 bg-white flex flex-col justify-between h-[350px] w-[400px] rounded-[10px]"
            onSubmit={handleClick}
          >
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="loginInput"
              type="email"
            />
            <TextField
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="loginInput"
            />
            <Button
              className="loginButton"
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Log In
            </Button>
            <span className="loginForgot">Forgot Password?</span>
            <Link
              to={"/register"}
              className="loginRegisterButton w-3/5 self-center h-12 bg-green-600"
            >
              <button className="loginRegisterButton flex items-center justify-center w-[100%] self-center h-12 bg-green-600 text-white text-xl font-medium cursor-pointer rounded-[10px]">
                Register
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
