import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_COMMENTS, GET_USER} from "../graphql/queries";
import { DELETE_COMMENT } from "../graphql/mutations";

import DeleteReviewCard from "../components/common/DeleteReviewCard";

import * as styles from "./DeleteReview.css";

const DeleteReview = ({ user }) => {
  const navigate = useNavigate();

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    context: {
      headers: {
        authorization: `${user.token}`,
      },
    },
    update(cache) {
      cache.modify({
        fields: {
          comments(existingComments = [], { readField }) {
            return existingComments.filter(
              (entryRef) => data.id !== readField("id", entryRef)
            );
          },
        },
      });
    },
  });
  const handleDelete = async (id) => {
    try {
      const res = await deleteComment({
        variables: {
          commentId: id,
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

  const { data, refetch } = useQuery(GET_ALL_COMMENTS);

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);
  return (
    <div className={styles.deleteReview}>
      <Helmet>
        <title>delete a comment | review it</title>
      </Helmet>
      <Link to="/admin-dashboard">Back to admin dashboard</Link>
      <h1>Delete a comment</h1>
      <div className={styles.reviewGrid}>
        {data
          ? data.getAllComments.map((comment) => (
              <DeleteReviewCard key={comment._id} comment={comment} deleteComment={handleDelete}/>
            ))
          : null}
      </div>
    </div>
  );
};

export default DeleteReview;
