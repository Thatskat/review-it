import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const ProfilePage = ({ user }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getUserId: id },
  });
  console.log(data?.getUser);
  return (
    <div>
      <Helmet>
        <title>{`${data?.getUser.displayName}'s profile | review it`}</title>
      </Helmet>
      <h1>{data?.getUser.displayName}</h1>
      <Link to={`/}`}>@{data?.getUser.username}</Link>
    </div>
  );
};

export default ProfilePage;
