import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";

import DashBoardCard from "../components/feature/DashBoardCard";

const AdminDashboardPage = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>admin dashboard | review it</title>
      </Helmet>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.displayName}! What would you like to do today?</p>
      <DashBoardCard
        url={`/admin-dashboard/add/show`}
        type={`Add a TV Show`}
        description={"loremcbhebfjifown"}
      />

      <h2>
        <Link to="/admin-dashboard/edit/show">Edit a TV Show</Link>
      </h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, hic
        ipsam. Praesentium corporis unde iusto veniam sapiente in, beatae
        repellendus.
      </p>
      <h2>
        <Link to="/admin-dashboard/delete/show">Delete a TV Show</Link>
      </h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, hic
        ipsam. Praesentium corporis unde iusto veniam sapiente in, beatae
        repellendus.
      </p>
    </div>
  );
};

export default AdminDashboardPage;
