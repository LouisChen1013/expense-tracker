import React from "react";
import Alert from "@material-ui/lab/Alert";

const Error = ({ error }) => {
  return (
    <div>
      <Alert severity="error">{error.join(" and ")}</Alert>
    </div>
  );
};

export default Error;
