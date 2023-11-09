import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMMENT_BY_ID, GET_TV_SHOW } from "../graphql/queries";
import { EDIT_COMMENT } from "../graphql/mutations";

import * as styles from "./AddShowPage.css";

const EditComment = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(GET_COMMENT_BY_ID, {
    variables: { commentId: id },
  });

  const getTvShow = useQuery(GET_TV_SHOW, {
    variables: { getTvShowId: data?.getCommentById.show[0] },
  });

  const [editComment] = useMutation(EDIT_COMMENT);
  useEffect(() => {
    if (user._id !== data?.getCommentById.author[0]) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  const onSubmit = async (formData) => {
    const { comment, author, show } = formData;
    try {
      const res = await editComment({
        variables: {
          editCommentId: id,
          userId: user?._id,
          input: { comment, author, show },
        },
        context: {
          headers: {
            authorization: `${user.token}`,
          },
        },
      });
      console.log(res.data);
      navigate(`/profile/${user?._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const commentSchema = Joi.object({
    comment: Joi.string().min(1).max(1024).required(),
    show: Joi.string(),
    author: Joi.string(),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(commentSchema),
    defaultValues: {
      comment: data?.getCommentById.comment,
      author: data?.getCommentById.author[0],
      show: data?.getCommentById.show[0],
    },
  });
  return (
    <div className={styles.addShowPage}>
      <Helmet>
        <title>edit comment | review it</title>
      </Helmet>
      <div>
        <h1>Edit comment</h1>
        <p>
          This comment appears for the show{" "}
          <Link to={`/show/${data?.getCommentById.show[0]}`}>
            {getTvShow.data?.getTvShow?.title}
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Comment</label>
          <input
            {...register("comment")}
            placeholder="Edit your comment"
            type="text"
            name="comment"
            defaultValue={data?.getCommentById.comment}
          />
          <button type="submit">edit</button>
        </form>
      </div>
      <div className="errorsGrid">
        {errors.comment && <span>Error: The comment is required!</span>}
        {errors.author && <span>Error: Author is required</span>}
        {errors.show && <span>Error: Show is required</span>}
      </div>
    </div>
  );
};

export default EditComment;
