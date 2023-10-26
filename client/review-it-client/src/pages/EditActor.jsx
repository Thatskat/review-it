import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import * as styles from "./EditShow.css";

import { useQuery } from "@apollo/client";
import { FIND_ALL_ACTORS } from "../graphql/queries";
import EditCard from "../components/common/EditCard";

const EditActor = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
    refetch();
  }, []);
  const { loading, error, data, refetch } = useQuery(FIND_ALL_ACTORS);
  return (
    <div className={styles.showOverview}>
      <Helmet>
        <title>edit an actor | review it</title>
      </Helmet>
      <Link to="/admin-dashboard" className="dashboardLink">
        Back to admin dashboard
      </Link>
      <h1>Edit an Actor</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint ad
        temporibus, ipsum maxime quos nostrum laudantium accusantium quisquam
        dolore voluptate.
      </p>
      <div className={styles.showsGrid}>
        {data &&
          data.findAllActors.map((actor) => (
            <EditCard
              show={actor}
              key={actor.id}
              link={`/admin-dashboard/edit/actor/${actor._id}`}
            />
          ))}
      </div>
    </div>
  );
};

export default EditActor;
