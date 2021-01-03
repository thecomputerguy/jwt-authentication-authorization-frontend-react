import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../_actions";

export const RegisterPage = () => {
  const [formState, setFormState] = useState({
    user: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
    submitted: false,
  });

  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    const { user } = formState;
    setFormState((state) => ({ ...state, user: { ...user, [name]: value } }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormState((state) => ({ ...state, submitted: true }));
    const { user } = formState;
    if (user.username && user.password && user.firstName && user.lastName) {
      userActions.register(user, dispatch);
    }
  }

  const { registering } = useSelector((state) => state.registration);
  const { user, submitted } = formState;

  return (
    <div className="col-md-6 col-md-offset-3">
      <h2>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div
          className={
            "form-group" + (submitted && !user.firstName ? " has-error" : "")
          }
        >
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
          {submitted && !user.firstName && (
            <div className="help-block">First Name is required</div>
          )}
        </div>
        <div
          className={
            "form-group" + (submitted && !user.lastName ? " has-error" : "")
          }
        >
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          {submitted && !user.lastName && (
            <div className="help-block">Last Name is required</div>
          )}
        </div>
        <div
          className={
            "form-group" + (submitted && !user.username ? " has-error" : "")
          }
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          {submitted && !user.username && (
            <div className="help-block">Username is required</div>
          )}
        </div>
        <div
          className={
            "form-group" + (submitted && !user.password ? " has-error" : "")
          }
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {submitted && !user.password && (
            <div className="help-block">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Register</button>
          {registering && (
            <img
              src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              alt=""
            />
          )}
          <Link to="/login" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
