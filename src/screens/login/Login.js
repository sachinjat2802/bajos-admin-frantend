import React, { useState , useEffect } from "react";
import "./Login.css";
import { Row, Col } from "react-bootstrap";
import { Box, Button } from "@mui/material";
import Img1 from "../../assets/mobile.png";
import Img2 from "../../assets/shield.png";
import { fontWeight } from "@mui/system";
// import axios from "axios";
import axiousConfig from '../../axiousConfig'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({setauthenticated }) => {
  const bg = "#74C3AD";
  const text = "#219653";

  const [phone, setPhone] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login')
  }, [])
  

  async function loginUser(credentials) {
    // var response = "";
    console.log(credentials)
    return axiousConfig.post('/login',JSON.stringify(credentials))
    .then(res =>res.data)
    .catch(err=>err.response.data)
  }

  const handleSubmit = async e => {
    
    const response = await loginUser({
      phone,
      password
    });
     //console.log(response)
    if((response.statusCode === 200)&&('data' in response))
    {
      setauthenticated(true)
      localStorage.setItem('accessToken', response['data']);
      navigate('/')
      // window.location.href = "/";
    }
    else
    {
      setError(response.message)
      setPass("")
    }
  }


return (
  <>
    <Row style={{ height: "100vh" }}>
      <Col lg={4} style={{ background: bg }}>
        <Box className="logo-text">BAJO'S</Box>
        <Box
          className="text-center"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <div className="wb-text">Welcome Back</div>
            <div style={{ color: "#4F4F4F" }}>
              Lorem ipsum dolor sit amet,
              <br />
              consectetur adipiscing elit. Nec <br />
              diam iaculis egestas faucibus lectus.
            </div>
          </Box>
        </Box>
      </Col>
      <Col>
        <Box
          className="text-center"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <div
              className="my-4"
              style={{
                color: text,
                fontSize: 48,
                fontWeight: 300,
              }}
            >
              Login
            </div>
            <div>
              {error&&<span style={{ color : 'red' }}>{error}</span>}
              <div className="input-con">
                <img className="img-input" src={Img1} alt="" />
                <input
                  className="global-input"
                  type="number"
                  placeholder="Phone Number"
                  style={{ width: 550 }}
                  value={phone}
                  onChange={(e) => {
                    e.preventDefault();
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="input-con">
                <img className="img-input" src={Img2} alt="" />
                <input
                  className="global-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  style={{ width: 550 }}
                  onChange={(e) => {
                    e.preventDefault();
                    setPass(e.target.value);
                  }}
                />
              </div>
              <Box>
                {phone.length == 10 && password.length > 1 ? (
                  <button
                    className="btn my-4"
                    style={{
                      width: 200,
                      height: 55,
                      color: "#fff",
                      background: bg,
                      border: `1px solid ${bg}`,
                      fontWeight: 600,
                      fontSize: 21,
                    }}
                    onClick={() => handleSubmit()}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="btn my-4"
                    disabled
                    style={{
                      width: 200,
                      height: 55,
                      color: text,
                      border: `1px solid ${bg}`,
                      fontWeight: 600,
                      fontSize: 21,
                    }}
                  >
                    Login
                  </button>
                )}
              </Box>
            </div>
          </Box>
        </Box>
      </Col>
    </Row>
  </>
);
};

export default Login;
