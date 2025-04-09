import { Routes, Route } from 'react-router-dom';
import '../src/plugins/font-awesome.js';
import PublicLayout from './layout/PublicLayout.jsx';
import { publicRoutes } from './routes/index.js';

function App() {
  return (
    <Routes>
      {
        publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = PublicLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })
      }
    </Routes>
  );
}

export default App;
