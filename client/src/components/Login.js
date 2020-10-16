import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialFormValues = {
  username: "",
  password: "",
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const { push } = useHistory();

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChanges = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/login", formValues) //{ username: 'lambda', password: 'school' }
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("token", res.data.payload);
        push("/bubblePage");
      })
      .catch((err) => {
        console.log("<<<LLAMA ERROR>>>", err);
      });
  };

  return (
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={onSubmit}>
        <span>Username: </span>
        <input type="text" name="username" onChange={handleChanges} />
        <br />
        <span>Password: </span>
        <input type="text" name="password" onChange={handleChanges} />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
