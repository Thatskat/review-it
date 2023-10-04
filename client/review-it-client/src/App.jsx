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
        <Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />}/>
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
