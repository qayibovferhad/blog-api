import React, { Suspense } from "react";

const LazyRegistartionPage = React.lazy(() => import("./Registration"));
export default () => (
  <Suspense fallback={<h1>Loading component..</h1>}>
    <LazyRegistartionPage />
  </Suspense>
);
