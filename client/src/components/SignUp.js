import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(state),
      headers: { "Content-type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.email === state.email)
          navigate("/", { state: { auth: true, email: state.email } });
        else {
          setError(data);
        }
      });
  }

  return (
    <div className="w-25 min-vh-100 mx-auto d-flex flex-column justify-content-center">
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <span className="text-danger">{error}</span>
        <label className="form-label">Name</label>
        <input
          type="text"
          value={state.name}
          onChange={inputHandler}
          className="form-control"
          placeholder="your name"
          autoComplete="off"
          required
          name="name"
        />
        <label className="form-label mt-2">Email address</label>
        <input
          type="email"
          value={state.email}
          onChange={inputHandler}
          className="form-control"
          id="email"
          placeholder="name@example.com"
          autoComplete="off"
          required
          name="email"
        />
        <label className="form-label mt-2">Password</label>
        <input
          type="password"
          value={state.password}
          onChange={inputHandler}
          className="form-control"
          id="password"
          placeholder="your password"
          autoComplete="off"
          required
          name="password"
        />
        <input
          type="submit"
          className="form-control mt-3 w-50 align-self-center btn btn-outline-success"
          value={"Sign up"}
        />
      </form>
      <div className="align-self-center">
        <p className="mt-3 ">
          Have an account?
          <span
            className=" text-primary rounded-3 link-primary link "
            role="button"
            onClick={() => navigate("/signin")}
          >
            {" Sign in "}
          </span>
        </p>
      </div>
    </div>
  );
}
