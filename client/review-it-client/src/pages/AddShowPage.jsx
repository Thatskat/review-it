import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@apollo/client";
import { ADD_TV_SHOW } from "../graphql/mutations";

import { BiArrowBack } from "react-icons/bi";

import * as styles from "./AddShowPage.css";

const AddShowPage = ({ user }) => {
  const navigate = useNavigate();
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(1000).required(),
    episodeNo: Joi.number().min(0).required(),
    showPoster: Joi.string()
      .pattern(new RegExp("^https://m.media-amazon.com/images/M/.*.(jpg)$"))
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
    <div className={styles.addShowPage}>
      <Helmet>
        <title>add a tv show | review it</title>
      </Helmet>
      <div>
        <Link to="/admin-dashboard">Back to Admin Dashboard</Link>
        <h1>Add a TV Show</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque nihil
          aspernatur esse reiciendis aperiam doloribus incidunt architecto culpa
          quod quidem inventore maiores corporis assumenda minima nesciunt
          numquam nostrum expedita dolorum sint atque natus tenetur, excepturi
          autem non? Voluptates, dolorum nisi.
        </p>
        {errors && <p>Please fix the following:</p>}
        <div className="errorsGrid">
          {errors.title && <span>The tv show title is required</span>}
          {errors.description && (
            <span>A description of the tv show is required</span>
          )}
          {errors.episodeNo && (
            <span>The number of episodes the show has is required</span>
          )}
          {errors.showPoster && <span>The show poster link must be following this format: https://m.media-amazon.com/images/M/.*.(jpg)</span>}
          {errors.imdbLink && <span>The tv show&apos;s imdb link must be in the following format: https://www.imdb.com/title/tt[0-9]+/? </span>}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>TV Show Title</label>
        <input
          {...register("title")}
          placeholder="Enter TV Show Title"
          type="text"
          name="title"
        />

        <label>TV Show Description</label>
        <input
          {...register("description")}
          placeholder="Enter TV Show Description"
          type="text"
          name="description"
        />

        <label>Episode Number</label>
        <input
          {...register("episodeNo")}
          placeholder="Enter the number of Episodes"
          type="number"
          name="episodeNo"
          min="1"
        />

        <label>TV Show Poster</label>
        <input
          {...register("showPoster")}
          placeholder="Enter the Show Poster Link"
          type="text"
          name="showPoster"
        />

        <label>TV Show iMDB Link</label>
        <input
          {...register("imdbLink")}
          placeholder="Enter the Tv Show's IMDB Link"
          type="text"
          name="imdbLink"
        />

        <button type="submit">Add show</button>
      </form>
    </div>
  );
};

export default AddShowPage;
