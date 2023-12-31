// REACT ROUTER DOM
import { Routes, Route, Navigate } from "react-router-dom";
// REACT HOOKS
import { useState, useEffect } from "react";
// APOLLO SERVER
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// LAYOUT
import Layout from "./components/layout/Layout";
// PAGES
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import ShowsPage from "./pages/Shows";
import ShowDetails from "./pages/Shows/ShowDetails";
import AboutUsPage from "./pages/AboutUsPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AddShowPage from "./pages/AddShowPage";
import ShowEdit from "./pages/ShowEdit";
import ShowDetailsEdit from "./pages/ShowDetailsEdit";
import DeleteShow from "./pages/DeleteShow";
import AddActor from "./pages/AddActor";
import EditActor from "./pages/EditActor";
import EditActorDetails from "./pages/EditActorDetails";
import DeleteActor from "./pages/DeleteActor";
import DeleteReview from "./pages/deleteReview";
import EditUser from "./pages/EditUser";
import AdminUserEdit from "./pages/AdminUserEdit";
import EditComment from "./pages/EditComment";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    saveTokenSession(user);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    client.clearStore();
  };

  function saveTokenSession(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  const getUserFromSessionStorage = () => {
    try {
      const string = sessionStorage.getItem("user");
      const user = JSON.parse(string);
      return user;
    } catch (err) {
      console.err(err);
      sessionStorage.setItem("User", "");
      return null;
    }
  };

  useEffect(() => {
    const user = getUserFromSessionStorage();
    if (user) {
      setUser(user);
    }
  }, []);

  function ProtectedRoutes({ component: Component, ...rest }) {
    const user = getUserFromSessionStorage();
    if (!user) {
      return <Navigate to="/" replace />;
    } else {
      return <Component {...rest} user={user} />;
    }
  }

  // PROTECTED ROUTES FUNCTION WHEN
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Layout user={user} logout={handleLogout} />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage login={handleLogin} />} />
          <Route path="/login" element={<LoginPage login={handleLogin} />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/show/:showId" element={<ShowDetails user={user} />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/profile/:id" element={<ProfilePage user={user} />} />
          <Route
            path="/profile/edit/:id"
            element={<ProtectedRoutes component={EditProfile} user={user} />}
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoutes component={AdminDashboardPage} user={user} />
            }
          />
          <Route
            path="/admin-dashboard/edit/show"
            element={<ProtectedRoutes component={ShowEdit} user={user} />}
          />
          <Route
            path="/admin-dashboard/edit/show/:id"
            element={
              <ProtectedRoutes component={ShowDetailsEdit} user={user} />
            }
          />
          <Route
            path="/admin-dashboard/add/show/"
            element={<ProtectedRoutes component={AddShowPage} user={user} />}
          />
          <Route
            path="/admin-dashboard/delete/show/"
            element={<ProtectedRoutes component={DeleteShow} user={user} />}
          />
          <Route
            path="/admin-dashboard/add/actor"
            element={<ProtectedRoutes component={AddActor} user={user} />}
          />
          <Route
            path="/admin-dashboard/edit/actor"
            element={<ProtectedRoutes component={EditActor} user={user} />}
          />
          <Route
            path="/admin-dashboard/delete/review"
            element={<ProtectedRoutes component={DeleteReview} user={user} />}
          />
          <Route
            path="/admin-dashboard/edit/actor/:id"
            element={
              <ProtectedRoutes component={EditActorDetails} user={user} />
            }
          />
          <Route
            path="/admin-dashboard/delete/actor"
            element={<ProtectedRoutes component={DeleteActor} user={user} />}
          />
          <Route
            path="/admin-dashboard/edit/user"
            element={<ProtectedRoutes component={EditUser} user={user} />}
          />
          <Route
            path="/admin-dashboard/edit/user/:id"
            element={<ProtectedRoutes component={AdminUserEdit} user={user} />}
          />
          <Route
            path="/profile/edit/review/:id"
            element={<ProtectedRoutes component={EditComment} user={user} />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
