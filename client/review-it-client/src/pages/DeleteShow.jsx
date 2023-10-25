import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TV_SHOWS } from "../graphql/queries";
import { DELETE_SHOW } from "../graphql/mutations";

import * as styles from "./DeleteShow.css";
import DeleteCard from "../components/common/DeleteCard";

const DeleteShow = ({ user }) => {
  const navigate = useNavigate();

  const [deleteShow] = useMutation(DELETE_SHOW, {
    context: {
      headers: {
        authorization: `${user.token}`,
      },
    },
    update(cache) {
      cache.modify({
        fields: {
          tvShows(existingShows = [], { readField }) {
            return existingShows.filter(
              (entryRef) => data.id !== readField("id", entryRef)
            );
          },
        },
      });
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await deleteShow({
        variables: {
          deleteShowId: id,
        },
      });
      if (res.errors) {
        console.err(res.errors[0].message);
      }
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const { data, refetch } = useQuery(GET_ALL_TV_SHOWS);

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);
  return (
    <div className={styles.deletePage}>
      <Helmet>
        <title>delete a tv show | review it</title>
      </Helmet>
      <Link to="/admin-dashboard">Back to admin dashboard</Link>
      <h1>Delete a TV Show</h1>
      {data ? data.getAllTvShows.map((show) => <DeleteCard key={show.id} show={show} />) : <p>no data</p>}
    </div>
  );
};

export default DeleteShow;
