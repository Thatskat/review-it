import * as styles from "./HomePage.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import primaryBlob from "../assets/blobs/primary-blob.svg";
import secondaryBlob from "../assets/blobs/secondary-blob.svg";

import { GET_COMMENT_BY_ID, GET_TV_SHOW, GET_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const HomePage = () => {
  const comment = useQuery(GET_COMMENT_BY_ID, {
    variables: { commentId: "654b276d3118377414619d6e" },
  });
  const userData = useQuery(GET_USER, {
    variables: { getUserId: comment.data?.getCommentById?.author[0] },
  });
  const showData = useQuery(GET_TV_SHOW, {
    variables: { getTvShowId: comment.data?.getCommentById?.show[0] },
  });
  return (
    <div>
      <Helmet>
        <title>home | review it</title>
      </Helmet>
      <div className={styles.home}>
        <div className={styles.reviewHighlight}>
          <img src={primaryBlob} className={styles.blob} />
          <img src={secondaryBlob} className={styles.blob} />
          <div className="reviewCard">
            <img src={showData.data?.getTvShow?.showPoster} />
            <div>
              <p>{comment.data?.getCommentById?.comment}</p>
              <Link
                to={`/show/${comment.data?.getCommentById?.show[0]}`}
                title={showData.data?.getTvShow?.title}
              >
                {showData.data?.getTvShow?.title}
              </Link>
              <Link to={`/profile/${comment.data?.getCommentById?.author[0]}`}>
                by {userData.data?.getUser?.username}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h1>
            Review <br></br>It
          </h1>
          <p>Unlocking the World of Reviews, One Click at a Time</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
