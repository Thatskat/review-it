import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

import { useQuery, useMutation } from "@apollo/client";
import { GET_TV_SHOW, GET_ALL_COMMENTS_FOR_SHOW } from "../../graphql/queries";
import { CREATE_COMMENT } from "../../graphql/mutations";

import * as styles from "./ShowDetails.css";

const ShowDetails = ({ user }) => {
  const schema = Joi.object({
    comment: Joi.string().min(1).max(1024).required(),
  });

  const { showId } = useParams();

  const { loading, error, data } = useQuery(GET_TV_SHOW, {
    variables: { getTvShowId: showId },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      comment: "",
      author: user?._id,
      show: showId,
    },
  });

  const [CreateComment] = useMutation(CREATE_COMMENT);

  const onSubmit = async (commentData, e) => {
    e.preventDefault();
    const { comment, author, show } = commentData;
    try {
      const res = await CreateComment({
        variables: {
          input: {
            comment,
            author,
            show,
          },
        },
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.details}>
      <Helmet>
        <title>{`${data?.getTvShow.title} | review it`}</title>
      </Helmet>
      <div>
        <Link to="/shows">Back to tv shows</Link>
        <h1>{data?.getTvShow.title}</h1>
        <p className="overview">
          <a
            href={data?.getTvShow.imdbLink}
            target="_blank"
            rel="noreferrer"
            title={`${data?.getTvShow.title}'s iMDB page`}
          >
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate="noValidate">
          <label>Comment</label>
          <input
            {...register("comment")}
            placeholder="Enter Comment"
            type="text"
            name="comment"
            onChange={(e) => console.log(e.target.value)}
          />
          {errors.comment && <span>Email is required to login</span>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default ShowDetails;
