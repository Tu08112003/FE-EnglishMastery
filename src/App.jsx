// src/App.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import routes from './routes/index.jsx';
import './plugins/font-awesome.js';
import PrivateRoute from './routes/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { restoreSession } from './redux/slice/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch(restoreSession({ user: parsedUser, token }));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

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