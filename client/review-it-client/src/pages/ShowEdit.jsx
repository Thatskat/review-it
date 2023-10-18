import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_ALL_TV_SHOWS } from "../graphql/queries";

const ShowEdit = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
    refetch();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_ALL_TV_SHOWS);
  return (
    <div>
      <Helmet>
        <title>edit show | review it</title>
      </Helmet>
      <Link to="/admin-dashboard">Back to dashboard</Link>
      {data &&
        data.getAllTvShows.map((show) => (
          <Link
            key={show.id}
            showData={show}
            to={`/admin-dashboard/edit/show/${show.id}`}
          >
            {show.title}
          </Link>
        ))}
    </div>
  );
};

export default ShowEdit;
