import { Route, Routes } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Error from "../pages/Error";
import Login from "../pages/forms/Login";
import Register from "../pages/forms/Register";
import Dashboard from "../pages/Dashboard";
import Layout from "../layouts/Layout";
import CustomerDetail from "../pages/CustomertDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Pages WITH navbar  */}

        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Customer Details */}
        <Route path="/dashboard/customers/:id" element={<CustomerDetail />} />
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
