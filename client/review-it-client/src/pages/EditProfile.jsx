import { Helmet } from "react-helmet";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

import { useMutation, useQuery } from "@apollo/client";
import { EDIT_USER } from "../graphql/mutations";
import { GET_USER } from "../graphql/queries";

import * as styles from "./AddShowPage.css";

const EditProfile = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== user?._id) {
      console.log("user do not match");
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getUserId: id },
  });

  const [editUser] = useMutation(EDIT_USER);

  const onSubmit = async (formData) => {
    const {
      firstName,
      lastName,
      username,
      email,
      isAdmin,
      displayName,
      password,
    } = formData;
    try {
      const res = await editUser({
        variables: {
          editUserId: id,
        },
        input: {
          firstName,
          lastName,
          username,
          password,
          email,
          isAdmin,
          displayName,
        },
        context: {
          headers: {
            authorization: `${user.token}`,
          },
        },
      });
      navigate(`/profile/id`);
    } catch (err) {
      console.error(err);
    }
  };
  const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    username: Joi.string()
      .pattern(new RegExp(`^[a-zA-Z0-9]+$`))
      .min(1)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$`)
      )
      .min(8)
      .max(100)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    isAdmin: Joi.boolean(),
    displayName: Joi.string().min(1).max(20).required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(userSchema),
    defaultValues: {
      firstName: data?.getUser.firstName,
      lastName: data?.getUser.lastName,
      username: data?.getUser.username,
      email: data?.getUser.email,
      isAdmin: data?.getUser.isAdmin,
      displayName: data?.getUser.displayName,
    },
  });

  return (
    <div className={styles.addShowPage}>
      <Helmet>
        <title>{`edit ${data?.getUser.username} | review it`}</title>
      </Helmet>
      <div>
        <Link to={`/profile/${id}`}>Back to Profile</Link>
        <h1>Edit {data?.getUser.username}</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
          <label>First Name</label>
          <input
            {...register("firstName")}
            placeholder="Enter user's first name"
            type="text"
            name="firstName"
            defaultValue={data?.getUser.firstName}
          />
          <label>Last Name</label>
          <input
            {...register("lastName")}
            placeholder="Enter user's last name"
            type="text"
            name="lastName"
            defaultValue={data?.getUser.lastName}
          />
          <label>Username</label>
          <input
            {...register("username")}
            placeholder="Enter username"
            type="text"
            name="username"
            defaultValue={data?.getUser.username}
          />
          <label>Display name</label>
          <input
            {...register("displayName")}
            placeholder="Enter Display Name"
            type="text"
            name="displayName"
            defaultValue={data?.getUser.displayName}
          />
          <label>Email</label>
          <input
            {...register("email")}
            placeholder="Enter Email"
            type="email"
            name="email"
            defaultValue={data?.getUser.email}
          />

          <button type="submit" onClick={() => console.log(data?.getUser)}>Edit User</button>
        </form>
      </div>
      <div className="errorsGrid">
        {" "}
        {errors.firstName && (
          <span>Error: The user&apos;s first name is required</span>
        )}
        {errors.lastName && (
          <span>Error: The user&apos;s last name is required</span>
        )}
        {errors.username && (
          <span>Error: The user&apos;s username is required</span>
        )}
        {errors.displayName && (
          <span>Error: The user&apos;s display name is required</span>
        )}
         {errors.email && (
          <span>Error: The user&apos;s email is required</span>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
