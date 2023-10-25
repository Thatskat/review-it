import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@apollo/client";
import { ADD_ACTOR } from "../graphql/mutations";

import * as styles from './AddShowPage.css'

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
      birthDate: "",
      imdbProfileLink: "",
      profilePicture: "",
    },
  });

  const [AddActor] = useMutation(ADD_ACTOR);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { firstName, lastName, birthDate, imdbProfileLink, profilePicture } =
      data;
    try {
      const res = await AddActor({
        variables: {
          input: {
            firstName,
            lastName,
            birthDate,
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
  return <div className={styles.addShowPage}>AddActor</div>;
};

export default AddActor;
