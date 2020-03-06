import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { NewPost } from "./pages/NewPost";
import { PostEdit } from "./components/PostEdit";
import { Register } from "./pages/Register";
import { Post } from "./pages/Post";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { UploadFiles } from "./components/UploadFiles";
import "./App.css";

export const App = () => {
  const LoggedInStatus = window.localStorage.getItem("isLoggedIn") || "0";
  const [isLoggedIn, setIsLoggedIn] = useState(LoggedInStatus);

  // //component did mount
  // useEffect(() => {
  //   //ask the backend if we are logged in
  //   checkLoginStatus();
  // }, []);

  // const checkLoginStatus = () => {
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //     credentials: "same-origin"
  //   };
  //   fetch("/auth/checkUser", requestOptions)
  //     .then(response => {
  //       console.log(response);
  //       if (response.status === 200) {
  //         setUserLoggedIn(true);
  //       }
  //     })
  //     .catch(error => console.log("error", error));
  // };

  return (
    <BrowserRouter>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login">
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/logout">
          <Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/register" component={Register} />
        {isLoggedIn === "1" && <Route exact path="/new" component={NewPost} />}
        <Route exact path="/post/:id" component={isLoggedIn}>
          <Post isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/update/:id" component={PostEdit} />
        <Route exact path="/upload" component={UploadFiles} />
        <Footer />
      </div>
    </BrowserRouter>
  );
};
