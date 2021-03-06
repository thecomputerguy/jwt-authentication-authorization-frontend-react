import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../_actions";

function handleDeleteUser(id, dispatch) {
  return (e) => userActions.delete(id, dispatch);
}

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    userActions.getAll(dispatch);
  }, [dispatch]);

  const { users, authentication: user } = useSelector((state) => state);

  return (
    <div className="col-md-6 col-md-offset-3">
      <h1>Hi {user.firstName}!</h1>
      <p>you are logged in with React Jwt!!</p>
      <h3>All registered users</h3>
      {users.loading && <em>Loading users...</em>}
      {users.error && <span className="text-danger">Error: {users.error}</span>}
      {users.items && (
        <ul>
          {users.items.map((user, index) => {
            return (
              <li key={user.id}>
                {user.firstName + " " + user.lastName}
                {user.deleting ? (
                  <em> - Deleting...</em>
                ) : user.deleteError ? (
                  <span className="text-danger">
                    - ERROR: {user.deleteError}
                  </span>
                ) : (
                  <span>
                    -{" "}
                    <a onClick={handleDeleteUser(user.id, dispatch)}>Delete</a>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
};
