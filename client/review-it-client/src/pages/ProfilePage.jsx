import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import * as styles from "./ProfilePage.css";

import { useQuery } from "@apollo/client";
import { GET_USER, GET_ALL_COMMENTS_BY_USER } from "../graphql/queries";

import CommentCard from "../components/common/CommentCard";

const ProfilePage = ({ user }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getUserId: id },
  });

  const commentData = useQuery(GET_ALL_COMMENTS_BY_USER, {
    variables: { userId: id },
  });

  return (
    <div className={styles.profile}>
      <Helmet>
        <title>{`${data?.getUser.displayName}'s profile | review it`}</title>
      </Helmet>
      <div>
        <div>
          <h2>Reviews</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
            quibusdam quam necessitatibus iste quas obcaecati. Perferendis
            officiis obcaecati itaque laborum.
          </p>
          <div className={styles.reviewBox}>
            {" "}
            {commentData.data &&
              commentData.data.getAllCommentsByUser.map((m) => (
                <CommentCard key={m._id} comment={m}/>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.infoBox}>
        <h1>{data?.getUser.displayName}</h1>
        <p>@{data?.getUser.username}</p>
        {user?._id == data?.getUser._id ? (
          <Link to={`/profile/edit/${data?.getUser._id}`}>
            <button>Edit Profile</button>
          </Link>
        ) : null}
        {user?.isAdmin === true ? (
          <Link to="/admin-dashboard">
            <button>Admin Dashboard</button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
