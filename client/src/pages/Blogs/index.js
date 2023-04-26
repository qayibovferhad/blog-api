import React, { Suspense } from "react";

const LazyBlogPage = React.lazy(() => import("./Blogs"));
export default () => (
  <Suspense fallback={<h1>Loading Component..</h1>}>
    <LazyBlogPage />
  </Suspense>
);
