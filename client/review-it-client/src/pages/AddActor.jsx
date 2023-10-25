import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@apollo/client";
import { ADD_ACTOR } from "../graphql/mutations";

import * as styles from "./AddShowPage.css";

const AddActor = ({ user }) => {
  const navigate = useNavigate();
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    imdbProfileLink: Joi.string()
      .pattern(new RegExp(`^https:\/\/www\.imdb\.com\/name\/nm[0-9]+\/?$`))
      .required(),
    profilePicture: Joi.string()
      .pattern(
        new RegExp("^https://m.media-amazon.com/images/M/[A-Z0-9a-z_.@]+.jpg$")
      )
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      imdbProfileLink: "",
      profilePicture: "",
    },
  });

  const [AddActor] = useMutation(ADD_ACTOR);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { firstName, lastName, imdbProfileLink, profilePicture } = data;
    try {
      const res = await AddActor({
        variables: {
          input: {
            firstName,
            lastName,
            imdbProfileLink,
            profilePicture,
          },
        },
        context: {
          headers: {
            authorization: `${user.token}`,
          },
        },
      });
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
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
        <title>add an actor | review it</title>
      </Helmet>
      <div>
        <Link to="/admin-dashboard">Back to Admin Dashboard</Link>
        <h1>Add an Actor</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Actor&apos;s first name</label>
          <input
            {...register("firstName")}
            placeholder="Enter Actor's First Name"
            type="text"
            name="firstName"
          />

          <label>Actor&apos;s last name</label>
          <input
            {...register("lastName")}
            placeholder="Enter Actor's Last Name"
            type="text"
            name="lastName"
          />

          <label>Actor&apos; profile picture</label>
          <input
            {...register("profilePicture")}
            placeholder="Enter the Actor's profile picture link"
            type="text"
            name="profilePicture"
          />

          <label>Actor&apos; iMDB Link</label>
          <input
            {...register("imdbProfileLink")}
            placeholder="Enter the Actor's iMDB Profile Link"
            type="text"
            name="imdbProfileLink"
          />

          <button type="submit">Add Actor</button>
        </form>
      </div>
      <div className="errorsGrid">
        {errors.firstName && (
          <span>Error: The actor&apos;s first name is required</span>
        )}
        {errors.lastName && (
          <span>Error: The actor&apos;s last name is required</span>
        )}
        {errors.profilePicture && (
          <span>
            Error: The profile picture link must be in the following format:
            https://m.media-amazon.com/images/M/[A-Z0-9a-z_.@]+.jpg{" "}
          </span>
        )}
        {errors.imdbProfileLink && (
          <span>
            Error: The actor&apos;s imdb link must be in the following format:
            https:\/\/www\.imdb\.com\/name\/nm[0-9]+\/?
          </span>
        )}
      </div>
    </div>
  );
};

export default AddActor;
