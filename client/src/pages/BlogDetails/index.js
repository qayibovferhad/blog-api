import React, { Suspense } from "react";

const LazyBlogDetailPage = React.lazy(() => import("./BlogDetail"));
export default () => (
  <Suspense fallback={<h1>Loading Component...</h1>}>
    <LazyBlogDetailPage />
  </Suspense>
);
