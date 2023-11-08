import { Link } from "react-router-dom";
import { GET_USER, GET_TV_SHOW } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const DeleteReviewCard = ({comment, deleteComment}) => {
    const userData = useQuery(GET_USER, {
        variables: { getUserId: comment?.author[0] },
      });
      const showData = useQuery(GET_TV_SHOW, {
        variables: {getTvShowId: comment?.show[0]}
      })
  return (
    <div>
        <h3>{comment.comment}</h3>
        <Link to={`/profile/${comment?.author[0]}`} title={`${userData.data?.getUser?.username}'s profile`}>{userData.data?.getUser?.username}</Link>
        <Link to={`/show/${comment?.show[0]}`} title={showData.data?.getTvShow?.title}>{showData.data?.getTvShow?.title}</Link>
        <button onClick={() => deleteComment(comment._id)}>Delete</button>
    </div>
  )
}

export default DeleteReviewCard