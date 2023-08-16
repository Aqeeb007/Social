import axios from "axios";
import { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router";
import { server } from "../../server";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    if (!username || !password || !passwordAgain || !email)
      toast.error("All fields are required");
    e.preventDefault();
    if (passwordAgain !== password) {
      toast.error("Passwords don't match!");
    } else {
      const user = {
        username: username,
        email: email,
        password: password,
      };
      try {
        await axios.post(`${server}/auth/register`, user);
        toast.success("Registered successfully");
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login w-screen h-screen bg-[#f0f2f5] flex items-center justify-center">
      <div className="loginWrapper flex w-[70%] h-[70%]">
        <div className="loginLeft flex flex-col justify-center flex-1">
          <h3 className="loginLogo text-6xl font-extrabold text-blue-600 mb-2">
            Chatbook
          </h3>
          <span className="loginDesc text-2xl">
            Chatbook helps you connect and share
            <br /> with the people in your life.
          </span>
        </div>
        <div className="loginRight flex flex-col justify-center flex-1">
          <form className="loginBox p-5 bg-white flex flex-col justify-between h-[430px] rounded-[10px]">
            <TextField
              id="filled-basic"
              label="Username"
              variant="filled"
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="loginInput"
            />
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
            <TextField
              id="filled-basic"
              label="Re-Enter Password"
              variant="filled"
              required
              onChange={(e) => {
                setPasswordAgain(e.target.value);
              }}
              className="loginInput"
            />
            <Button
              className="loginButton"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Sign Up
            </Button>
            <Link
              to={"/login"}
              className="loginRegisterButton w-3/5 self-center h-12 bg-green-600"
            >
              <button className="loginRegisterButton flex items-center justify-center w-[100%] self-center h-12 bg-green-600 text-white text-xl font-medium cursor-pointer rounded-[10px]">
                Log into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
