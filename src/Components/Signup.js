import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {

  const [credentials,setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token', json.authtoken);
      navigate("/login")
      props.showAlert("Account Created Successfully", "success")

    }else{
      props.showAlert("Invalid Details", "warning")
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  return (
    <>
     <div className="heading">
    <button className="button" data-text="Awesome">
          <span className="actual-text">&nbsp;Signup&nbsp;</span>
          <span aria-hidden="true" className="hover-text">
            &nbsp;signup&nbsp;
          </span>
        </button>
    </div>
    <div className="signup-container">
          <form onSubmit={handleSubmit}>
        <div className="container1">
          <label htmlFor="name">
            <i className="fa-solid fa-signature"></i>
            <input
              className="input"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              required
              value={credentials.name}
              onChange={onchange}
            />
          </label>
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
              minLength={5}
              onChange={onchange}
            />
          </label>
          <label htmlFor="cpassword">
          <i className="fa-solid fa-check-double"></i>
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onchange}
              minLength={5}
            />
          </label>
          <button className="btn-signup" type="submit">
          <i className="fa-solid fa-user-plus lock-img mx-1"></i>Sign Up
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Signup;
