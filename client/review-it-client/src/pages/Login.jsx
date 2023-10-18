import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";

const LoginPage = ({ login }) => {
  const schema = Joi.object({
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const res = await loginUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      login(res.data.loginUser);
      navigate(`/profile/${res.data.loginUser._id}`);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Helmet>
        <title>login | review it</title>
      </Helmet>
      Login Page
      <form onSubmit={handleSubmit(onSubmit)} noValidate="noValidate">
        <label>Email</label>
        <input
          {...register("email")}
          placeholder="Enter Email"
          type="email"
          name="email"
        />
        {errors.email && <span>This field is required</span>}
        <label>Password</label>
          <input
            {...register("password")}
            placeholder="Enter Password"
            type="password"
            name="password"
          />
          {errors.password && <span>This field is required</span>}
          <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
