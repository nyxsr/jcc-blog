import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Navbar() {
    const data = JSON.parse(sessionStorage.getItem('session-item'))
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token");

    const logoutFunc = () =>{
        toast('Anda sedang diarahkan keluar', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('session-item')
        setTimeout(()=>{
            window.location.href = '/auth/login'
        },2000)
    }

    useEffect(() => {
        if (!token) {
          navigate("/auth/login", {
            state: {
              alertLogin: true,
              replace: true,
            },
          });
        }
      }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 py-3">
        <ToastContainer/>
      <NavLink
        className="navbar-brand"
        href="/"
        style={{ textDecoration: "none", color: "#fafafa", fontWeight: "600" }}
      >
        <span style={{ color: "rgba(253, 1, 243, 1)", fontWeight: "700" }}>
          Post
        </span>
        App
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="./">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="./post">
              Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="./about">
              About us
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
        <li className="nav-item">
            <NavLink className="nav-link">
              Hi, {data.username ? data.username : null}
            </NavLink>
          </li>
          <li className="nav-item">
            <button className="btn nav-link" onClick={logoutFunc}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
