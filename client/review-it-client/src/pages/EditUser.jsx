import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/queries";
import { DELETE_USER } from "../graphql/mutations";

import * as styles from "./DeleteShow.css"

const EditUser = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
    refetch();
  }, []);

  const [deleteUser] = useMutation(DELETE_USER, {
    context: {
      headers: {
        authorization: `${user.token}`,
      },
    },
    update(cache) {
      cache.modify({
        fields: {
          users(existingUsers = [], { readField }) {
            return existingUsers.filter(
              (entryRef) => data.id !== readField("id", entryRef)
            );
          },
        },
      });
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser({
        variables: {
          deleteUserId: id,
        },
      });
      if (res.errors) {
        console.error(res.errors[0].message);
      }
      refetch();
    } catch (err) {
        console.error(err)
    }
  };

  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
  return (
    <div className={styles.deletePage}>
      <Helmet>
        <title>edit users | review it</title>
      </Helmet>
      <Link to="/admin-dashboard">Back to admin dashboard</Link>
      <h1>Edit Users</h1>
      <div className={styles.showGrid}>
        {data &&
          data.getAllUsers.map((user) => (
            <div key={user._id} className={styles.adminCard}>
              <p>{user.username}</p>
              <Link to={`/profile/${user._id}`}>View Profile</Link>
              <Link to={`${user._id}`}>Edit</Link>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditUser;
