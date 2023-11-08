import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ user, logout }) => {
  return (
    <div>
      <Header user={user} logout={logout} />
      <div>
        <Outlet  style={{minHeight: "100vh"}}/>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
