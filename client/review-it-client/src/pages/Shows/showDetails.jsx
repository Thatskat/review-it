import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useQuery } from "@apollo/client";
import { GET_TV_SHOW } from "../../graphql/queries";

import * as styles from "./ShowDetails.css";

const ShowDetails = ({ user }) => {
  const { showId } = useParams();

  const { loading, error, data } = useQuery(GET_TV_SHOW, {
    variables: { getTvShowId: showId },
  });

  console.log(data);

  return (
    <div className={styles.details}>
      <Helmet>
        <title>{`${data?.getTvShow.title} | review it`}</title>
      </Helmet>
      <div>
        <Link to="/shows">Back to tv shows</Link>
        <h1>{data?.getTvShow.title}</h1>
        <p className="overview">
          <a href={data?.getTvShow.imdbLink} target="_blank" rel="noreferrer" title={`${data?.getTvShow.title}'s iMDB page`}>
            imdb
          </a>{" "}
          | <b>{data?.getTvShow.episodeNo}</b> episode
          {data?.getTvShow.episodeNo > 1 ? "s" : ""}
        </p>
        <p>{data?.getTvShow.description}</p>
        <img src={data?.getTvShow.showPoster} />
      </div>
      <div>
        <p>reviews go here</p>
      </div>
    </div>
  );
};

export default ShowDetails;
