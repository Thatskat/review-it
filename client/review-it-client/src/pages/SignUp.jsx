import { useState } from "react";
import * as styles from "./Login.css";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";

const SignUpPage = ({ login }) => {
  const schema = Joi.object({
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
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    isAdmin: Joi.boolean(),
    displayName: Joi.string().min(1).max(20).required(),
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
      username: "",
      password: "",
      isAdmin: false,
      email: "",
      displayName: "",
    },
  });

  const [addUser] = useMutation(ADD_USER);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      username,
      password,
      displayName,
      isAdmin,
      email,
    } = data;
    try {
      const result = await addUser({
        variables: {
          input: {
            firstName,
            lastName,
            username,
            password,
            displayName,
            isAdmin,
            email,
          },
        },
      });
      console.log(result.data.addUser);
      login(result.data.addUser);
      navigate(`/profile/${result.data.addUser._id}`);
    } catch (err) {
      console.error(err);
      setErrMessage(err.message);
    }
  };
  return (
    <div className={styles.loginPage}>
      <Helmet>
        <title>sign up | review it</title>
      </Helmet>
          <h1>Sign Up</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
            cum
          </p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate="noValidate">
            <label>First Name</label>
            <input
              {...register("firstName")}
              placeholder="Enter First Name"
              type="text"
              name="firstName"
            />
            {errors.firstName && <span>This field is required</span>}
            <label>Last Name</label>
            <input
              {...register("lastName")}
              placeholder="Enter Last Name"
              type="text"
              name="lastName"
            />
            {errors.lastName && <span>This field is required</span>}
            <label>Email</label>
            <input
              {...register("email")}
              placeholder="Enter Email"
              type="email"
              name="email"
            />
            {errors.email && <span>This field is required</span>}
            <label>Username</label>
            <input
              {...register("username")}
              placeholder="Enter Username"
              type="text"
              name="username"
            />
            {errors.username && <span>This field is required</span>}
            <label>Display Name</label>
            <input
              {...register("displayName")}
              placeholder="Enter a Display Name"
              type="text"
              name="displayName"
            />
            {errors.displayName && <span>This field is required</span>}
            <label>Password</label>
            <input
              {...register("password")}
              placeholder="Enter Password"
              type="password"
              name="password"
            />
            {errors.password && <span>This field is required</span>}
            <button type="submit">Sign Up</button>
          </form>
        </div>
  );
};

export default SignUpPage;
