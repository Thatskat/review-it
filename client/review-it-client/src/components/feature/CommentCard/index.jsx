import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/queries";

import * as styles from "./CommentCard.css";

const CommentCard = ({ comment }) => {
  const userData = useQuery(GET_USER, {
    variables: {getUserId: comment?.author[0]}
  })
  return (
    <div className={styles.commentCard}>
      <p>{comment.comment}</p>
      <Link to={`/profile/${comment?.author[0]}`}>{userData.data?.getUser?.username}</Link>
      <p>{comment.createdAt}</p>
    </div>
  );
};

export default CommentCard;
