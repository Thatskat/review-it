import { Link } from "react-router-dom";

const index = ({ url, type, description }) => {
  return (
    <div>
      <h2>
        <Link to={url}>{type}</Link>
      </h2>
      <p>{description}</p>
    </div>
  );
};

export default index;
