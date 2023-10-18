import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useQuery } from "@apollo/client";
import { GET_TV_SHOW } from "../../graphql/queries";

const ShowDetails = ({ user }) => {
  const { showId } = useParams();

  const { loading, error, data } = useQuery(GET_TV_SHOW, {
    variables: { getTvShowId: showId },
  });

  console.log(data);

  return (
    <div>
      <Helmet>
        <title>{`${data?.getTvShow.title} | review it`}</title>
      </Helmet>
      <h1>{data?.getTvShow.title}</h1>
      <p></p>
    </div>
  );
};

export default ShowDetails;
