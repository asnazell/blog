import { withRouter } from "react-router-dom";

export const Logout = withRouter(({ history, isLoggedIn, setIsLoggedIn }) => {
  console.log("isLoggedIn", isLoggedIn);

  fetch("/auth/logout", {
    credentials: "same-origin"
  }).then(() => {
    window.localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn("0");
    history.push("/");
  });

  return null;
});
