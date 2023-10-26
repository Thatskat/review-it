import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TV_SHOW } from "../graphql/queries";
import { EDIT_TV_SHOW } from "../graphql/mutations";

import * as styles from "./AddShowPage.css";

const ShowDetailsEdit = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  const { data } = useQuery(GET_TV_SHOW, {
    variables: {
      getTvShowId: id,
    },
  });

  const [editTvShow] = useMutation(EDIT_TV_SHOW);

  const onSubmit = async (formData) => {
    const { title, description, episodeNo, showPoster, imdbLink } = formData;
    try {
      const res = await editTvShow({
        variables: {
          editTvShowId: id,
          input: {
            title,
            description,
            episodeNo,
            showPoster,
            imdbLink,
          },
        },
        context: {
          headers: {
            authorization: `${user.token}`,
          },
        },
      });
      console.log(res.data);
      navigate("/admin-dashboard/edit/show");
    } catch (err) {
      console.log(err);
    }
  };

  const showSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(1000).required(),
    episodeNo: Joi.number().min(0).required(),
    showPoster: Joi.string()
      .pattern(new RegExp("^https://m.media-amazon.com/images/M/.*.(jpg)$"))
      .required(),
    imdbLink: Joi.string()
      .pattern(new RegExp(`^https:\/\/www\.imdb\.com\/title\/tt[0-9]+\/?$`))
      .required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(showSchema),
    defaultValues: {
      title: data?.getTvShow.title,
      description: data?.getTvShow.description,
      episodeNo: data?.getTvShow.episodeNo,
      showPoster: data?.getTvShow.showPoster,
      imdbLink: data?.getTvShow.imdbLink,
    },
  });

  return (
    <div className={styles.addShowPage}>
      <Helmet>
        <title>{`edit "${data?.getTvShow.title}" | review it`}</title>
      </Helmet>
      <div>
        <Link to="/admin-dashboard/edit/show">Back to edit show overview</Link>
        <h1>Edit {data?.getTvShow.title}</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
          <label>Title</label>
          <input
            {...register("title")}
            placeholder="Enter TV Show Title"
            type="text"
            name="title"
            defaultValue={data?.getTvShow.title}
          />
          <label>Description</label>
          <input
            {...register("description")}
            placeholder="Enter TV Show Description"
            type="text"
            name="description"
            defaultValue={data?.getTvShow.description}
          />
          <label>Episode Number</label>
          <input
            {...register("episodeNo")}
            placeholder="Enter the number of Episodes"
            type="number"
            name="episodeNo"
            defaultValue={data?.getTvShow.episodeNo}
          />
          <label>Show Poster</label>
          <input
            {...register("showPoster")}
            placeholder="Enter the number of Episodes"
            type="test"
            name="showPoster"
            defaultValue={data?.getTvShow.showPoster}
          />
          <label>iMDB Link</label>
          <input
            {...register("imdbLink")}
            placeholder="imdb link"
            type="test"
            name="imdbLink"
            defaultValue={data?.getTvShow.imdbLink}
          />
          <button type="submit">Edit Show</button>
        </form>
      </div>
      <div className="errorsGrid">
        {errors.title && <span>Error: The tv show title is required</span>}
        {errors.description && (
          <span>Error: A description of the tv show is required</span>
        )}
        {errors.episodeNo && (
          <span>Error: The number of episodes the show has is required</span>
        )}
        {errors.showPoster && (
          <span>
            Error: The show poster link must be following this format:
            https://m.media-amazon.com/images/M/.*.(jpg)
          </span>
        )}
        {errors.imdbLink && (
          <span>
            Error: The tv show&apos;s imdb link must be in the following format:
            https://www.imdb.com/title/tt[0-9]+/?{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default ShowDetailsEdit;
