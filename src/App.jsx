import { Routes, Route } from "react-router-dom";
import routes from "./routes/index.jsx";
import "./plugins/font-awesome.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess, finishLoading } from "./redux/slice/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    if (token && role) {
      dispatch(loginSuccess({role}));
    }
    dispatch(finishLoading());
  }, [dispatch]);


  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
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
    </>
  );
}

export default App;
