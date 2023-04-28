import React, { Suspense } from "react";

const LazyBlogCreatePage = React.lazy(() => import("./BlogCreate"));
export default () => (
  <Suspense fallback={<h1>Loading Component..</h1>}>
    <LazyBlogCreatePage />
  </Suspense>
);
