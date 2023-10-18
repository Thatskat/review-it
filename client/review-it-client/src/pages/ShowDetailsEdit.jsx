import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TV_SHOW } from "../graphql/queries";
import { EDIT_TV_SHOW } from "../graphql/mutations";

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

  const showSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(1000).required(),
    episodeNo: Joi.number().min(0).required(),
    showPoster: Joi.string()
      .pattern(
        new RegExp(
          "^https://m.media-amazon.com/images/M/[A-Za-z0-9]+@.?_?[A-Za-z0-9_]+.(jpg)$"
        )
      )
      .required(),
    imdbLink: Joi.string()
      .pattern(new RegExp(`^https:\/\/www\.imdb\.com\/title\/tt[0-9]+\/?$`))
      .required(),
  });

  const {
    watch,
    handleSubmit,
    register,
    setValue,
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

  const [editTvShow, { loading, error }] = useMutation(EDIT_TV_SHOW);

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    const { title, description, episodeNo, showPoster, imdbLink } = formData;
    try {
      const res = await editTvShow({
        variables: {
          input: {
            title,
            description,
            episodeNo,
            showPoster,
            imdbLink,
          },
          editTvShowId: {
            id,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Helmet>
        <title>{`edit "${data?.getTvShow.title}" | review it`}</title>
      </Helmet>
      <h1>Edit {data?.getTvShow.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="noValidate">
        <label>Title</label>
        <input
          {...register("title")}
          placeholder="Enter TV Show Title"
          type="text"
          name="title"
          defaultValue={data?.getTvShow.title}
        />
        {errors.title && <span>This field is required</span>}
        <label>Description</label>
        <input
          {...register("description")}
          placeholder="Enter TV Show Description"
          type="text"
          name="description"
          defaultValue={data?.getTvShow.description}
        />
        {errors.description && <span>This field is required</span>}
        <label>Episode Number</label>
        <input
          {...register("episodeNo")}
          placeholder="Enter the number of Episodes"
          type="number"
          name="episodeNo"
          defaultValue={data?.getTvShow.episodeNo}
        />
        {errors.episodeNo && <span>This field is required</span>}
        <label>Show Poster</label>
        <input
          {...register("showPoster")}
          placeholder="Enter the number of Episodes"
          type="text"
          name="showPoster"
          defaultValue={data?.getTvShow.showPoster}
        />
        {errors.showPoster && <span>This field is required</span>}
        <label>iMDB Link</label>
        <input
          {...register("imdbLink")}
          placeholder="imdb link"
          type="text"
          name="imdbLink"
          defaultValue={data?.getTvShow.imdbLink}
        />
        {errors.imdbLink && <span>This field is required</span>}
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default ShowDetailsEdit;
