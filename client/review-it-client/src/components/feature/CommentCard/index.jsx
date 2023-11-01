import { Link } from "react-router-dom";

import * as styles from "./CommentCard.css";

const CommentCard = ({ comment }) => {
  return (
    <div className={styles.commentCard}>
      <p>{comment.comment}</p>
      <Link to={`/profile/${comment.author[0]}`}>{comment.author[0]}</Link>
      <p>{comment.createdAt}</p>
    </div>
  );
};

export default CommentCard;
