import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries";
import { DELETE_COMMENT } from "../../../graphql/mutations";

import * as styles from "./CommentCard.css";

const CommentCard = ({ comment, user }) => {
  const userData = useQuery(GET_USER, {
    variables: { getUserId: comment?.author[0] },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    context: {
      headers: {
        authorization: `${user?.token}`,
      },
    },
    update(cache) {
      cache.modify({
        fields: {
          comments(existingComments = [], { readField }) {
            return existingComments.filter(
              (entryRef) => comment?._id !== readField("id", entryRef)
            );
          },
        },
      });
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await deleteComment({
        variables: { commentId: id },
      });
      if (res.errors) {
        console.error(res.errors[0].message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.commentCard}>
      <p>{comment.comment}</p>
      <Link
        to={`/profile/${comment?.author[0]}`}
        title={`${userData.data?.getUser?.username}'s Profile`}
      >
        by {userData.data?.getUser?.username}
      </Link>
      <p>{comment.createdAt}</p>
      <div className={styles.userLinks}>
      {comment?.author[0] === user?._id ? (
        <button onClick={() => handleDelete(comment?._id)}>Delete</button>
      ) : null}
      {comment?.author[0] === user?._id ? (
        <Link to={`/profile/edit/review/${comment?._id}`}><button>Edit</button></Link>
      ) : null}
      </div>
    </div>
  );
};

export default CommentCard;
