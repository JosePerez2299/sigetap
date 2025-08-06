import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import ROUTES from "../../../routes/Routes";

const ValidateInt = () => {
  const { id } = useParams();

  return <Outlet />;
};

export default ValidateInt;
