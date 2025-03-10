import { Route, Routes } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Error from "../pages/Error";
import Login from "../pages/forms/Login";
import Register from "../pages/forms/Register";
import Dashboard from "../pages/Dashboard";
import Layout from "../layouts/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Pages WITH navbar  */}

        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Login & Register */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Error */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
