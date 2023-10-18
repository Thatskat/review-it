import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TV_SHOW } from "../graphql/queries";
import { EDIT_TV_SHOW } from "../graphql/mutations";

const ShowDetailsEdit = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  const { loading, error, data } = useQuery(GET_TV_SHOW, {
    variables: {
      getTvShowId: id,
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
  };

  const showSchema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(1000).required(),
    episodeNo: Joi.number().min(0).required(),
    showPoster: Joi.string()
      .pattern(
        new RegExp(
          "^https://m.media-amazon.com/images/M/[A-Za-z0-9]+@.?_?[A-Za-z0-9_]+.(jpg)$"
        )
      )
      .required(),
    imdbLink: Joi.string()
      .pattern(new RegExp(`^https:\/\/www\.imdb\.com\/title\/tt[0-9]+\/?$`))
      .required(),
  });

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: joiResolver(showSchema) });
  return (
    <div>
      <Helmet>
        <title>{`edit "${data?.getTvShow.title}" | review it`}</title>
      </Helmet>
      <h1>Edit {data?.getTvShow.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </div>
  );
};

export default ShowDetailsEdit;
