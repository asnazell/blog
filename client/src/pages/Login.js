import React from "react";
import { withRouter } from "react-router-dom";

export const Login = withRouter(({ history, isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = React.useState("assel@gmail.com");
  const [password, setPassword] = React.useState("pass");
  const [errors, setErrors] = React.useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    console.log("submitting");

    queryUserStatus();
  };

  // // message: successfully signed up, you can sign in
  // if (state && action === 'PUSH') {
  //   return (
  //     <div className="alert alert-success" role="alert">
  //       {`[${state.time}] --- `} <strong>Congratulations!</strong> {state.message}
  //     </div>
  //   );
  // }

  // // message: sign in failed
  // if (state && action === 'REPLACE') {
  //   return (
  //     <div className="alert alert-danger" role="alert">
  //       {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
  //     </div>
  //   );
  // }

  const queryUserStatus = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("credentials", "same-origin");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    fetch("/auth/login", requestOptions)
      .then(async data => {
        if (data.status === 200) {
          console.log("logged in");

          setIsLoggedIn("1");
          window.localStorage.setItem("isLoggedIn", "1");

          history.push("/");
        }

        if (data.status === 404) {
          console.log("user not found");
          if (email !== "") setErrors(["404 user not found"]);
        }
      })
      .catch(e => {
        console.log(e.status);
      });
  };

  const logout = () => {
    fetch("/auth/logout", {
      credentials: "same-origin"
    })
      .then(async data => {
        if (data.status === 200) {
          setIsLoggedIn(false);

          setErrors([]);
        } else {
          console.log("error logging out");
          if (email !== "") setErrors(["Error loggin out"]);
        }
      })
      .catch(e => {
        console.log(e.status);
      });
  };

  // const renderWelcome = () => {
  //   return (
  //     <div style={{ paddingTop: "20px" }}>
  //       <p>You are logged in!</p>
  //       <button onClick={logout}>Logout</button>
  //     </div>
  //   );
  // };

  // <div>
  //   {!isLoggedIn && renderForm()}
  //   {/* {isLoggedIn && renderWelcome()} */}
  //   {errors.map((e, indx) => (
  //     <p key={indx}>{e}</p>
  //   ))}
  // </div>

  return (
    <div className="form-container">
      <form className="form-login" onSubmit={handleSubmit}>
        <div className="form-field">
          <div className="form-label" />
          <h3>Login</h3>
        </div>
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            placeholder="Email.."
            className="form-input"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            placeholder="Password.."
            className="form-input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div className="form-field">
          <div className="form-label" />
          <button type="submit" className="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
});
