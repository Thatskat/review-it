import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { EDIT_USER } from "../graphql/mutations";

const AdminUserEdit = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  const { data } = useQuery(GET_USER, {
    variables: {
      getUserId: id,
    },
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
          editUser: id,
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
      navigate("/admin-dashboard/edit/user");
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
    <div>
      <Helmet>
        <title>{`edit user "${data?.getUser.username}" | review it`}</title>
      </Helmet>
      <Link to="/admin-dashboard/edit/user">Back to edit user overview</Link>
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
        <label htmlFor="isAdmin">Is Admin?</label>
        <select name="isAdmin" id="isAdmin" {...register("isAdmin")}>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label>Password</label>
        <input
          {...register("password")}
          placeholder="password"
          type="password"
          name="password"
          defaultValue={data?.getUser.password}
        />
        <button type="submit">Edit User</button>
      </form>
      <div className="errorsGrid">
        {errors.firstName && <span>Error: The user&apos;s first name is required</span>}
        {errors.firstName && <span>Error: The user&apos;s first name is required</span>}
      </div>
    </div>
  );
};

export default AdminUserEdit;
