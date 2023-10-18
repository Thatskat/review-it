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
import PopularShowsPage from "./pages/Shows/popular";
import ShowDetails from "./pages/Shows/ShowDetails";
import AboutUsPage from "./pages/AboutUsPage";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";

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
          <Route path="/shows/trending" element={<PopularShowsPage />} />
          <Route path="/show/:showId" element={<ShowDetails user={user} />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/profile/:id" element={<ProfilePage user={user} />} />
          <Route
            path="/profile/edit/:id"
            element={<ProtectedRoutes component={ProfilePage} user={user} />}
          />
          <Route path="*" component={<PageNotFound />}/>
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
