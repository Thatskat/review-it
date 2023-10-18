import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@apollo/client";
import { ADD_TV_SHOW } from "../graphql/mutations";

const AddShowPage = ({ user }) => {
  const navigate = useNavigate();
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(1000).required(),
    episodeNo: Joi.number().min(0).required(),
    showPoster: Joi.string()
      .pattern(
        new RegExp(
          "^https://m\.media-amazon\.com/images/M/.*\.(jpg)$"
        )
      )
      .required(),
    imdbLink: Joi.string()
      .pattern(new RegExp("^https://www.imdb.com/title/tt[0-9]+/?$"))
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      episodeNo: "",
      showPoster: "",
      imdbLink: "",
    },

  });

  const [addTvShow] = useMutation(ADD_TV_SHOW);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { title, description, episodeNo, showPoster, imdbLink } = data;
    console.log(showPoster)
    try {
      const res = await addTvShow({
        variables: {
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
      navigate("/admin-dashboard");
    } catch (err) {
      setErrorMessage(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>add a tv show | review it</title>
      </Helmet>
      <Link to="/admin-dashboard">Back to Admin Dashboard</Link>
      <h1>Add a TV Show</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>TV Show Title</label>
        <input
          {...register("title")}
          placeholder="Enter TV Show Title"
          type="text"
          name="title"
        />
        {errors.title && <span>This field is required</span>}
        <label>TV Show Description</label>
        <input
          {...register("description")}
          placeholder="Enter Description"
          type="text"
          name="description"
        />
        {errors.description && <span>This field is required</span>}
        <label>Episode Number</label>
        <input
          {...register("episodeNo")}
          placeholder="Enter First Name"
          type="number"
          name="episodeNo"
        />
        {errors.episodeNo && <span>This field is required</span>}
        <label>TV Show Poster</label>
        <input
          {...register("showPoster")}
          placeholder="Enter First Name"
          type="text"
          name="showPoster"
        />
        {errors.showPoster && <span>This field is required</span>}
        <label>TV Show iMDB Link</label>
        <input
          {...register("imdbLink")}
          placeholder="Enter First Name"
          type="text"
          name="imdbLink"
        />
        {errors.imdbLink && <span>This field is required</span>}
        <button type="submit">Add show</button>
      </form>
    </div>
  );
};

export default AddShowPage;
