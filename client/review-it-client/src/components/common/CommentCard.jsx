import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TV_SHOW } from "../../graphql/queries";
import { DELETE_COMMENT } from "../../graphql/mutations";

import * as styles from "./CommentCard.css";

const CommentCard = ({ comment, user }) => {
  const showData = useQuery(GET_TV_SHOW, {
    variables: { getTvShowId: comment?.show[0] },
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
      <h3>{comment?.comment}</h3>
      <Link
        to={`/show/${comment?.show[0]}`}
        title={showData.data?.getTvShow?.title}
      >
        {showData.data?.getTvShow?.title}
      </Link>
      <p>Created at: {comment?.createdAt}</p>
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
