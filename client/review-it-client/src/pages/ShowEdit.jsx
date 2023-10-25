import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import * as styles from "./EditShow.css";

import { useQuery } from "@apollo/client";
import { GET_ALL_TV_SHOWS } from "../graphql/queries";
import EditCard from "../components/common/EditCard";

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
    <div className={styles.showOverview}>
      <Helmet>
        <title>edit a show | review it</title>
      </Helmet>
      <Link to="/admin-dashboard" className="dashboardLink">
        Back to admin dashboard
      </Link>
      <h1>Edit a Show</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint ad
        temporibus, ipsum maxime quos nostrum laudantium accusantium quisquam
        dolore voluptate.
      </p>
      <div className={styles.showsGrid}>
        {data &&
          data.getAllTvShows.map((show) => (
            <EditCard
              show={show}
              key={show.id}
              link={`/admin-dashboard/edit/show/${show.id}`}
            />
          ))}
      </div>
    </div>
  );
};

export default ShowEdit;
