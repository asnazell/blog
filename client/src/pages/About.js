import React from "react";

export const About = () => (
  <div className="form-container">
    <div className="form-field">
      <div className="form-label" />
      <h3>About me</h3>
    </div>
    <div className="form-field">
      <div className="form-label" />
      <img className="about-image" src="/fam.jpg" alt="Blog Post Placeholder" />
    </div>
    <div className="form-field">
      <div className="form-label" />
      <p style={{ maxWidth: "400px", textAlign: "left" }}>
        Hello, I’m Assel. I am 43 years old, married and have three girls and a
        boy, Chloe, 9, Katie, 7, Claire, 4 and Madi, 24! I’ve had many jobs,
        from being the very much enthusiastic epidemiologist in my hometown
        Almaty (Kazakhstan), to starting my own startup - home cleaning company,
        that has grown very fast and has been sold, to a tech specialist
        initially and promoted to technical expert at Apple. A few years ago I
        have decided to update my skills. I have completed free online tutorials
        in various programming languages. In my pursuit to become a full stack
        software developer I have joined General Assembly for intensive
        immersive course! I am very excited to my future and this blog will keep
        me one my toes whenever I go, my family path, my career path and my own
        fun time!
      </p>
    </div>
  </div>
);
