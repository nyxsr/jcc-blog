import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
// import WebFont from "webfontloader";

const base_url = "https://jcc.brandingyou.id/api/";

export const Wrapper = styled.div`
  background: rgb(44, 196, 164);
  background: linear-gradient(
    59deg,
    rgba(44, 196, 164, 1) 0%,
    rgba(138, 20, 247, 1) 55%,
    rgba(253, 1, 243, 1) 100%
  );
  padding-bottom: 20rem;
`;

export const Container = styled(motion.div)`
  min-width: 40vw;
  max-width: 40rem;
  margin: auto;
  box-shadow: 0px 10px 26px 0px rgba(0, 0, 0, 0.75);
  background-color: #fafafa;
  height: 100%;
  padding: 5rem;
  > h1 {
    text-align: center;
    font-size: 3rem;
    /* padding-top: 5rem; */
    font-weight: 600;
  }
  > img {
    padding-top: 2rem;
    padding-bottom: 2rem;
    width: 100%;
    object-fit: cover;
  }
`;

export const Button = styled(motion.button)`
  background-color: ${(props) => (props.login ? "#2c9ac4" : null)};
  background-color: ${(props) => (props.register ? "#EE03F3" : null)};
  font-weight: 600;
  border: none;
  border-radius: 15px;
  padding: 10px 15px;
  font-size: 1.8rem;
  color: ${(props) => (props.login || props.register ? "#fafafa" : null)};
`;

let inputTap = {
  scale: 1.3,
  transition: {
    duration: 0.5,
    type: "spring",
    bounce: 0.3,
  },
};

function App() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  
  const token = JSON.parse(sessionStorage.getItem('token'))
  const navigate = useNavigate()
  const {state} = useLocation(); 
  // const [session,setSession] = useState({});

  const loginSubmit = async() => {
    try {
      const response = await axios.post(`${base_url}login`, data)
      // setSession(response.data.data)
      sessionStorage.setItem('token',response.data.data.token)
      sessionStorage.setItem('session-item',JSON.stringify(response.data.data.user))
      navigate('/dashboard')
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
        // console.log('masuk')
    }
  };
  
  useEffect(()=>{
    if (token) {
      navigate('/dashboard')
    }
    if(state){
      toast.warn('Silahkan Login Dahulu!', {
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
  },[])
  

  console.log(state)
  return (
    <Wrapper>
      <ToastContainer />
      <Container
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
      >
        <h1>Login Page</h1>
        <img src="https://source.unsplash.com/500x200?news" alt="" />
        <form className="mt-5" onSubmit={(e)=>e.preventDefault()}>
          <div className="mb-3 mx-auto w-50">
            <label htmlFor="" className="label fs-4">
              Username
            </label>
            <motion.input
              whileFocus={inputTap}
              type="text"
              className="form-control form-control-lg"
              placeholder="ex:johnru123"
              autoFocus
              onChange={(e) =>
                setData((data) => ({ ...data, username: e.target.value }))
              }
            />
          </div>
          <div className="mb-3 mx-auto w-50">
            <label htmlFor="" className="label fs-4">
              Password
            </label>
            <motion.input
              whileFocus={inputTap}
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              onChange={(e) =>
                setData((data) => ({ ...data, password: e.target.value }))
              }
            />
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Button
              whileHover={{ scale: 1.3 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              transition={{ type: "spring", stiffness: "500", damping: "10" }}
              login
              className="mx-auto"
              onClick={loginSubmit}
            >
              Login
            </Button>
          </div>
        </form>
        <div className="d-flex justify-content-center">
          <Link
            className="mt-3"
            style={{ color: "#1f1f1f" }}
            to="/auth/register"
          >
            Not Yet Registered ?
          </Link>
        </div>
      </Container>
    </Wrapper>
  );
}

export default App;
