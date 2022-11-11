import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { EditPost } from "./component/Article/Article";
import Navbar from "./component/Navbar/Navbar";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

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

  console.log(token)
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/home' element={<Navigate to='/dashboard/'/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/post/edit/:id' element={<EditPost/>}/>
      </Routes>
    </>
  );
}
