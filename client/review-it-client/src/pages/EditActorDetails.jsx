import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_ACTOR_BY_ID} from "../graphql/queries";
import { EDIT_ACTOR} from "../graphql/mutations";

const EditActorDetails = () => {
  return (
    <div>EditActorDetails</div>
  )
}

export default EditActorDetails