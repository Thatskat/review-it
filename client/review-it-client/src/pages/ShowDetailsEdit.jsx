import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { GET_TV_SHOW } from "../graphql/queries";
import { EDIT_TV_SHOW } from "../graphql/mutations";

const ShowDetailsEdit = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);
  return <div>ShowDetailsEdit</div>;
};

export default ShowDetailsEdit;
