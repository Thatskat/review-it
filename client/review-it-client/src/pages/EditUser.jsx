import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_ALL } from "../graphql/queries";

const EditUser = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);
  return <div>EditUser</div>;
};

export default EditUser;
