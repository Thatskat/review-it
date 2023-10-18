import React from "react";
import { Helmet } from "react-helmet";

const AdminDashboardPage = ({ user }) => {
  return (
    <div>
      <Helmet>
        <title>admin dashboard | review it</title>
      </Helmet>
      <h1>Admin Dashboard</h1>
      
    </div>
  );
};

export default AdminDashboardPage;
