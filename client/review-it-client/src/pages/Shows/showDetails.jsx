import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

import { useQuery, useMutation } from "@apollo/client";
import { GET_TV_SHOW, GET_ALL_COMMENTS_FOR_SHOW, GET_USER } from "../../graphql/queries";
import { CREATE_COMMENT } from "../../graphql/mutations";

import * as styles from "./ShowDetails.css";

const ShowDetails = ({ user }) => {
  const schema = Joi.object({
    comment: Joi.string().min(1).max(1024).required(),
    author: Joi.string(),
    show: Joi.string(),
  });

  const { showId } = useParams();

  const userId = JSON.parse(sessionStorage.getItem("user"));

  const showData = useQuery(GET_TV_SHOW, {
    variables: { getTvShowId: showId },
  });

  const { data, refetch } = useQuery(GET_ALL_COMMENTS_FOR_SHOW, {
    variables: { showId: showId },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      comment: "",
      author: userId?._id,
      show: showId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT);

  const onSubmit = async (commentData, e) => {
    e.preventDefault();
    const { comment, author, show } = commentData;
    try {
      const res = await createComment({
        variables: {
          input: {
            comment,
            author,
            show,
          },
        },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.details}>
      <Helmet>
        <title>{`${showData.data?.getTvShow.title} | review it`}</title>
      </Helmet>
      <div>
        <Link to="/shows">Back to tv shows</Link>
        <h1>{showData.data?.getTvShow.title}</h1>
        <p className="overview">
          <a
            href={showData.data?.getTvShow.imdbLink}
            target="_blank"
            rel="noreferrer"
            title={`${showData.data?.getTvShow.title}'s iMDB page`}
          >
            imdb
          </a>{" "}
          | <b>{showData.data?.getTvShow.episodeNo}</b> episode
          {showData.data?.getTvShow.episodeNo > 1 ? "s" : ""}
        </p>
        <p>{showData.data?.getTvShow.description}</p>
        <img src={showData.data?.getTvShow.showPoster} />
      </div>
      <div>
        {data &&
          data.getAllCommentsForShow.map((comment) => (
            <div key={comment._id}>
              <p>{comment.comment}</p>
              <Link to={`/profile/${comment.author[0]}`}>{comment.author[0]}</Link>
            </div>
          ))}
          {user ? <form onSubmit={handleSubmit(onSubmit)}>
          <label>Comment</label>
          <input
            {...register("comment")}
            placeholder="Enter Comment"
            type="text"
            name="comment"
          />
          {errors.comment && <span>comment is required</span>}
          <button type="submit">Comment</button>
        </form> : ""}
     
      </div>
    </div>
  );
};

export default ShowDetails;
