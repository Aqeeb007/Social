import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from "./redux/store";
import { loadUser, getAllUsers } from "./redux/actions/user";
import { getAllPosts } from "./redux/actions/post";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(getAllUsers());
    Store.dispatch(getAllPosts());

  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/profile/:username" element=<Profile /> />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Router >
  );
}

export default App;
