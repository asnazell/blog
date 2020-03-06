import React from "react";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ViewSinglePost } from "../components/ViewSinglePost";

export const Post = withRouter(({ isLoggedIn, history }) => {
  const { id } = useParams();
  return (
    <section>
      <ViewSinglePost id={id} />
    </section>
  );
});
