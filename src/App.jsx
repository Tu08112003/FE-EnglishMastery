// src/App.jsx
import { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import routes from './routes/index.jsx';
import './plugins/font-awesome.js';
import PrivateRoute from './routes/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSuccess, logout } from './redux/slice/authSlice';
import { fetchUserInfo } from './redux/slice/userSlice';

function App() {
  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.user);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      dispatch(loginSuccess());
    } else if (error) {
      localStorage.removeItem('access_token');
      dispatch(logout());
    }
  }, [userInfo, error, dispatch]);

  return (
    <>
      <Routes>
        {routes.map((group, i) => {
          const Layout = group.layout;
          return group.children.map((route, j) => {
            const Page = route.protected ? (
              <PrivateRoute>{route.component}</PrivateRoute>
            ) : (
              route.component
            );
            return (
              <Route
                key={`${i}-${j}`}
                path={route.path}
                element={<Layout>{Page}</Layout>}
              />
            );
          });
        })}
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;