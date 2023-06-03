import React from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";

const router = createBrowserRouter([{ path: "*", Component: Root }]);
const App = () => {
  return <RouterProvider router={router} />;
};
function Root() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}
export default App;
