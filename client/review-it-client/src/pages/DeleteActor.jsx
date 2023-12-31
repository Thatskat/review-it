import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_ALL_ACTORS } from "../graphql/queries";
import { DELETE_ACTOR } from "../graphql/mutations";

import * as styles from "./DeleteShow.css";
import DeleteCard from "../components/common/DeleteCard";

const DeleteActor = ({ user }) => {
  const navigate = useNavigate();

  const [deleteActor] = useMutation(DELETE_ACTOR, {
    context: {
      headers: {
        authorization: `${user.token}`,
      },
    },
    update(cache) {
      cache.modify({
        fields: {
          actors(existingActors = [], { readField }) {
            return existingActors.filter(
              (entryRef) => data.id !== readField("id", entryRef)
            );
          },
        },
      });
    },
  });

  const { data, refetch } = useQuery(FIND_ALL_ACTORS);

  const handleDelete = async (id) => {
    try {
      const res = await deleteActor({
        variables: {
          deleteActorId: id,
        },
      });
      if (res.errors) {
        console.error(res.errors[0].message);
      }
      refetch();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);
  return (
    <div className={styles.deletePage}>
      <Helmet>
        <title>delete an actor | review it</title>
      </Helmet>
      <Link to="/admin-dashboard">Back to admin dashboard</Link>
      <h1>Delete an Actor</h1>
      <div className={styles.showGrid}>
      {data ? data.findAllActors.map((actor) => <DeleteCard key={actor._id} show={actor} handleDelete={handleDelete} />) : <p>no data</p>}
      </div>
   
    </div>
  );
};

export default DeleteActor;
