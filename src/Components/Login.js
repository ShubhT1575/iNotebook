import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const [credentials,setCredentials] = useState({
    email: "",
    password: ""
  })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({ email: credentials.email , password: credentials.password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Loged In Successfully", "success")
      navigate("/")
    }else{
      props.showAlert("Invalid Credentials", "danger")
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="heading">
    <button className="button" data-text="Awesome">
          <span className="actual-text">&nbsp;Login&nbsp;</span>
          <span aria-hidden="true" className="hover-text">
            &nbsp;Login&nbsp;
          </span>
        </button>
    </div>
    <div className="signup-container">
          <form onSubmit={handleSubmit}>
        <div className="container1">
          <label htmlFor="email">
          <i className="fa-solid fa-at"></i>
            <input
              className="input"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onchange}
              required
            />
          </label>
          <label htmlFor="password">
          <i className="fa-solid fa-key"></i>
            <input
              className="input"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
          </label>
          <button className="btn-signup" type="submit">
            <i className="fa-solid fa-lock lock-img"></i> Log in
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
