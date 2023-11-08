import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TV_SHOW } from "../../graphql/queries";

import * as styles from "./CommentCard.css"

const CommentCard = ({ comment }) => {
  const showData = useQuery(GET_TV_SHOW, {
    variables: { getTvShowId: comment?.show[0] },
  });

  return (
    <div className={styles.commentCard}>
      <h3>{comment.comment}</h3>
      <Link to={`/show/${comment.show[0]}`} title={showData.data?.getTvShow?.title}>
        {showData.data?.getTvShow?.title}
      </Link>
      <p>Created at: {comment.createdAt}</p>
    </div>
  );
};

export default CommentCard;
