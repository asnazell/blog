import React from "react";
import { ViewAllPosts } from "../components/ViewAllPosts";

export class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  render() {
    return (
      <div>
        <div className="cards"></div>
        <div className="container">
          <ViewAllPosts />
        </div>
      </div>
    );
  }
}
