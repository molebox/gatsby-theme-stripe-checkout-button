import * as React from "react";

interface Error {
  error: string;
}

export default ({ error }: Error) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <h1>Error - {error}</h1>
    <h5>override me as im not pretty...</h5>
    <h5>to do that you have to shadow me in your site, or theme.</h5>
  </div>
);
