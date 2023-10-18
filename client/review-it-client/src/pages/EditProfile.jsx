import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { EDIT_USER } from "../graphql/mutations";
import { GET_USER } from "../graphql/queries";

const EditProfile = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== user?._id) {
      console.log("user do not match");
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getUserId: id },
  });


  return (
    <div>
      <Helmet>
        <title>{`edit ${data?.getUser.displayName} | review it`}</title>
      </Helmet>
    </div>
  );
};

export default EditProfile;
