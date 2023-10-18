import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const ProfilePage = ({ user }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getUserId: id },
  });

  return (
    <div>
      <Helmet>
        <title>{`${data?.getUser.displayName}'s profile | review it`}</title>
      </Helmet>
      <h1>{data?.getUser.displayName}</h1>
      <p>@{data?.getUser.username}</p>
      {user?._id == data?.getUser._id ? (
        <Link to={`/profile/edit/${data?.getUser._id}`}>edit</Link>
      ) : (
        ""
      )}
      {user?.isAdmin === true ? (
        <Link to="/admin-dashboard">Admin Dashboard</Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePage;
