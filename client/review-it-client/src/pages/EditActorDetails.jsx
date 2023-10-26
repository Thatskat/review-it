import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_ACTOR_BY_ID } from "../graphql/queries";
import { EDIT_ACTOR } from "../graphql/mutations";

import * as styles from "./AddShowPage.css";

const EditActorDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  const { data } = useQuery(FIND_ACTOR_BY_ID, {
    variables: {
      findActorByIdId: id,
    },
  });

  const [editActor] = useMutation(EDIT_ACTOR);

  const onSubmit = async (formData) => {
    const { firstName, lastName, profilePicture, imdbProfileLink } = formData;
    try {
      const res = await editActor({
        variables: {
          editActorId: id,
          input: {
            firstName,
            lastName,
            profilePicture,
            imdbProfileLink,
          },
        },
        context: {
          headers: {
            authorization: `${user.token}`,
          },
        },
      });
      console.log(res);
      navigate("/admin-dashboard/edit/actor");
    } catch (err) {
      console.error(err);
    }
  };

  const actorSchema = Joi.object({
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
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(actorSchema),
    defaultValues: {
      firstName: data?.findActorById.firstName,
      lastName: data?.findActorById.lastName,
      imdbProfileLink: data?.findActorById.imdbProfileLink,
      profilePicture: data?.findActorById.profilePicture,
    },
  });
  return (
    <div className={styles.addShowPage}>
      <Helmet>
        <title>{`edit "${data?.findActorById.firstName} ${data?.findActorById.lastName}" | review it`}</title>
      </Helmet>
      <div>
        <Link to="/admin-dashboard/edit/actor">
          Back to edit actor overview
        </Link>
        <h1>
          Edit {data?.findActorById.firstName} {data?.findActorById.lastName}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate="noValidate">
          <label>Actor&apos;s first name</label>
          <input
            {...register("firstName")}
            placeholder="Enter Actor's First Name"
            type="text"
            name="firstName"
            defaultValue={data?.findActorById.firstName}
          />

          <label>Actor&apos;s last name</label>
          <input
            {...register("lastName")}
            placeholder="Enter Actor's Last Name"
            type="text"
            name="lastName"
            defaultValue={data?.findActorById.lastName}
          />

          <label>Actor&apos; profile picture</label>
          <input
            {...register("profilePicture")}
            placeholder="Enter the Actor's profile picture link"
            type="text"
            name="profilePicture"
            defaultValue={data?.findActorById.profilePicture}
          />

          <label>Actor&apos; iMDB Link</label>
          <input
            {...register("imdbProfileLink")}
            placeholder="Enter the Actor's iMDB Profile Link"
            type="text"
            name="imdbProfileLink"
            defaultValue={data?.findActorById.imdbProfileLink}
          />

          <button type="submit">Edit Actor</button>
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

export default EditActorDetails;
