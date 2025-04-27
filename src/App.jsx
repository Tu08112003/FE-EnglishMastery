// src/App.jsx
import { Routes, Route } from "react-router-dom";
import routes from "./routes/index.jsx";
import "./plugins/font-awesome.js";
import PrivateRoute from "./routes/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, finishLoading } from "./redux/slice/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(loginSuccess());
    } else {
      dispatch(finishLoading());
    }
  }, [dispatch]);

  if (loading) return <div className="flex items-center justify-center font-bold text-gray-600">Loading...</div>;

  return (
    <>
      <Routes>
        {routes.map((group, i) => {
          const Layout = group.layout;
          return group.children.map((route, j) => (
            <Route
              key={`${i}-${j}`}
              path={route.path}
              element={<Layout>{route.component}</Layout>}
            />
          ));
        })}
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
