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

  // GraphQL Mutation for updating a journal entry
  const [editTvShow] = useMutation(EDIT_TV_SHOW, {
    update(cache, { data: { editTvShow } }) {
      const { getTvShow } = cache.readQuery({
        query: GET_TV_SHOW,
        variables: {
          getTvShowId: id,
        },
      }) || { getTvShow: null };
      if (getTvShow) {
        cache.writeQuery({
          query: GET_TV_SHOW,
          variables: {
            getTvShowId: id,
          },
          data: {
            getTvShow: {
              ...getTvShow,
              ...editTvShow,
            },
          },
        });
      }
    },
  });

  const onSubmit = async (formData, e) => {
    e.preventDefault();
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
      console.log(episodeNo);
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
    <div>
      <Helmet>
        <title>{`edit "${data?.getTvShow.title}" | review it`}</title>
      </Helmet>
      <h1>Edit {data?.getTvShow.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
        <label>Title</label>
        <input
          {...register("title")}
          placeholder="Enter TV Show Title"
          type="text"
          name="title"
        />
        {errors.title && <span>This field is required</span>}
        <label>Description</label>
        <input
          {...register("description")}
          placeholder="Enter TV Show Description"
          type="text"
          name="description"
        />
        {errors.description && <span>This field is required</span>}
        <label>Episode Number</label>
        <input
          {...register("episodeNo")}
          placeholder="Enter the number of Episodes"
          type="number"
          name="episodeNo"
          onChange={(e) => console.log(e.target.value)}
        />
        {errors.episodeNo && <span>This field is required</span>}
        <label>Show Poster</label>
        <input
          {...register("showPoster")}
          placeholder="Enter the number of Episodes"
          type="test"
          name="showPoster"
        />
        {errors.showPoster && <span>This field is required</span>}
        <label>iMDB Link</label>
        <input
          {...register("imdbLink")}
          placeholder="imdb link"
          type="test"
          name="imdbLink"
        />
        {errors.imdbLink && <span>This field is required</span>}
        <button type="submit">Edit Show</button>
      </form>
    </div>
  );
};

export default ShowDetailsEdit;
