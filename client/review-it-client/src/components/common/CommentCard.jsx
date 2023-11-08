import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TV_SHOW } from "../../graphql/queries";

const CommentCard = ({ comment }) => {
  const showData = useQuery(GET_TV_SHOW, {
    variables: { getTvShowId: comment?.show[0] },
  });

  return (
    <div>
      <h3>{comment.comment}</h3>
      <Link to={`/show/${comment.show[0]}`}>
        {showData.data?.getTvShow?.title}
      </Link>
    </div>
  );
};

export default CommentCard;
