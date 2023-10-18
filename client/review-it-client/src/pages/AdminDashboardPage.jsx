import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import DashBoardCard from "../components/feature/DashBoardCard";

import * as styles from "./AdminDashboard.css";

const AdminDashboardPage = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate(`/profile/${user?._id}`);
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <Helmet>
        <title>admin dashboard | review it</title>
      </Helmet>
      <h1>Admin Dashboard</h1>
      <p className="subHeading">Welcome, {user?.displayName}! What would you like to do today?</p>
      <div className="dashboardGrid">
        <DashBoardCard
          url={`/admin-dashboard/add/show`}
          type={`Add a TV Show`}
          description={"loremcbhebfjifown"}
        />
        <DashBoardCard
          url={`/admin-dashboard/edit/show`}
          type={`Edit a TV Show`}
          description={"loremcbhebfjifown"}
        />
        <DashBoardCard
          url={`/admin-dashboard/delete/show`}
          type={`Delete a TV Show`}
          description={"loremcbhebfjifown"}
        />
        <DashBoardCard
          url={`/admin-dashboard/add/actor`}
          type={`Add an Actor`}
          description={"loremcbhebfjifown"}
        />
        <DashBoardCard
          url={`/admin-dashboard/edit/actor`}
          type={`Edit an Actor`}
          description={"loremcbhebfjifown"}
        />
        <DashBoardCard
          url={`/admin-dashboard/delete/actor`}
          type={`Delete an Actor`}
          description={"loremcbhebfjifown"}
        />
        <DashBoardCard
          url={`/admin-dashboard/delete/review`}
          type={`Delete a Review`}
          description={"loremcbhebfjifown"}
        />
          <DashBoardCard
          url={`/admin-dashboard/edit/user`}
          type={`Edit a User`}
          description={"loremcbhebfjifown"}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
