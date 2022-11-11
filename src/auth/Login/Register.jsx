import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Container, Wrapper } from "../../App";
import { motion } from "framer-motion";

import 'react-toastify/dist/ReactToastify.css';

const base_url  = 'https://jcc.brandingyou.id/api/'

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  const submitRegister = async() =>{
   try {
   const response =  await axios.post(`${base_url}register`, data)
   toast.success(response.data.meta.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    setTimeout(()=>{
        navigate('/auth/login')
    },1000)
   } catch (error) {
     toast.error(error.response.data.meta.message, {
       position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
   }
  }
  console.log(data);
  let inputTap = {
        scale:1.3,
        transition:{
            duration:0.5,
            type:'spring',
            bounce:.3
        }
    }
  return (
    <>
      <Wrapper>
    <ToastContainer />
        <Container initial={{y:'-100vh'}} animate={{y:0}} transition={{duration:1, type:'spring', bounce:.3}}>
          <h1>Register Page</h1>
          <img src="https://source.unsplash.com/500x200?newspaper" />
          <form className="mt-5" onSubmit={(e)=> e.preventDefault()}>
            <div className="mb-3 mx-auto w-50">
              <label htmlFor="" className="label fs-4">
                Name
              </label>
              <motion.input
                type="text"
                whileFocus={inputTap}
                className="form-control form-control-lg"
                placeholder="ex:Johnny G"
                onChange={(e) =>
                  setData((data) => ({ ...data, name: e.target.value }))
                }
                autoFocus
              />
            </div>
            <div className="mb-3 mx-auto w-50">
              <label htmlFor="" className="label fs-4">
                Email
              </label>
              <motion.input
                type="email"
                whileFocus={inputTap}
                className="form-control form-control-lg"
                placeholder="ex:john@gmail.com"
                onChange={(e) =>
                    setData((data) => ({ ...data, email: e.target.value }))
                  }
                required
              />
            </div>
            <div className="mb-3 mx-auto w-50">
              <label htmlFor="" className="label fs-4">
                Username
              </label>
              <motion.input
                type="text"
                whileFocus={inputTap}
                className="form-control form-control-lg"
                placeholder="ex:johnru123"
                onChange={(e) =>
                    setData((data) => ({ ...data, username: e.target.value }))
                  }
                required
              />
            </div>
            <div className="mb-3 mx-auto w-50">
              <label htmlFor="" className="label fs-4">
                Password
              </label>
              <motion.input
                type="password"
                whileFocus={inputTap}
                className="form-control form-control-lg"
                placeholder="Password"
                onChange={(e) =>
                    setData((data) => ({ ...data, password: e.target.value }))
                  }
                required
              />
            </div>
            <div className="d-flex justify-content-center mt-5">
              <Button
                whileHover={{ scale: 1.3 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
                transition={{ type: "spring", stiffness: "500", damping: "10" }}
                register
                className="mx-auto"
                onClick={submitRegister}
              >
                Register
              </Button>
            </div>
          </form>
          <div className="d-flex justify-content-center">
            <Link
              className="mt-3"
              style={{ color: "#1f1f1f" }}
              to="/auth/login"
            >
              Have Registered ?
            </Link>
          </div>
        </Container>
      </Wrapper>
    </>
  );
}
